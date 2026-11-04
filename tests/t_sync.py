# Sync between devices: merge rules, plus two browser "devices" syncing through a mocked Google Drive
# and a stubbed Google sign-in script. Run from src/ with a server on 8767 (python3 -m http.server 8767).
import json, re, itertools
from playwright.sync_api import sync_playwright

URL = 'http://localhost:8767/hub_test.html'
DRIVE = {}          # id -> {'name':..., 'body': str}
ids = itertools.count(1)
fails = []
def check(name, ok, info=''):
    print(('PASS ' if ok else 'FAIL ') + name + ('' if ok else '  ' + str(info)))
    if not ok: fails.append(name)

GIS = """window.google={accounts:{oauth2:{
  initTokenClient:function(c){return{requestAccessToken:function(o){(window.__prompts=window.__prompts||[]).push(o.prompt);
    setTimeout(function(){c.callback({access_token:'tok',expires_in:3600})},10)}}},
  hasGrantedAllScopes:function(){return true},revoke:function(t,cb){cb&&cb()}}}};"""

def gis(route): route.fulfill(status=200, content_type='text/javascript', body=GIS)

def drive(route):
    rq = route.request; u = rq.url
    if not (rq.headers.get('authorization') or '').startswith('Bearer '):
        return route.fulfill(status=401, body='{}')
    if '/drive/v3/files?' in u and rq.method == 'GET':
        fs = [{'id': i} for i, f in DRIVE.items() if f['name'] == 'ppl-hub-sync.json']
        return route.fulfill(status=200, content_type='application/json', body=json.dumps({'files': fs}))
    m = re.search(r'/drive/v3/files/([^?]+)\?alt=media', u)
    if m and rq.method == 'GET':
        f = DRIVE.get(m.group(1))
        return route.fulfill(status=200 if f else 404, content_type='application/json', body=f['body'] if f else '{}')
    m = re.search(r'/upload/drive/v3/files/([^?]+)\?uploadType=media', u)
    if m and rq.method == 'PATCH':
        DRIVE[m.group(1)]['body'] = rq.post_data
        return route.fulfill(status=200, content_type='application/json', body='{}')
    if '/upload/drive/v3/files?uploadType=multipart' in u and rq.method == 'POST':
        parts = rq.post_data.split('--ppl-hub-sync-part')
        meta = json.loads(parts[1].split('\r\n\r\n', 1)[1].strip())
        body = parts[2].split('\r\n\r\n', 1)[1].rstrip('\r\n')
        assert meta['parents'] == ['appDataFolder']
        i = 'f%d' % next(ids); DRIVE[i] = {'name': meta['name'], 'body': body}
        return route.fulfill(status=200, content_type='application/json', body=json.dumps({'id': i}))
    route.fulfill(status=400, body='unexpected ' + rq.method + ' ' + u)

def remote():
    fs = [f for f in DRIVE.values() if f['name'] == 'ppl-hub-sync.json']
    return json.loads(fs[0]['body'])['data']['ppl-hub-v1'] if fs else None

with sync_playwright() as p:
    br = p.chromium.launch()
    # ---------- merge rules ----------
    pg = br.new_page(); pg.goto(URL); pg.wait_for_timeout(300)
    b = {'days': {'100': 5}, 'cards': {'a': {'b': 1, 'd': 101, 'n': 1}}, 'quiz': {'T': [{'d': 100, 's': 3, 'n': 5, 'm': 'quiz'}]},
         'miss': {'x': {'n': 1}, 'y': {'n': 2}}, 'lab': {'L': {'n': 2, 'best': 50, 'last': 50, 'd': 100}}, 'newd': {'d': 101, 'n': 2}, 'plan': 0}
    l = json.loads(json.dumps(b)); r = json.loads(json.dumps(b))
    l['days']['100'] = 8; l['cards']['a'] = {'b': 2, 'd': 104, 'n': 2}; l['quiz']['T'].append({'d': 101, 's': 4, 'n': 5, 'm': 'quiz'})
    del l['miss']['x']; l['lab']['L'] = {'n': 3, 'best': 70, 'last': 70, 'd': 101}; l['newd'] = {'d': 101, 'n': 5}
    r['days']['100'] = 6; r['days']['101'] = 4; r['cards']['b'] = {'b': 1, 'd': 102, 'n': 1}; r['quiz']['T'].append({'d': 101, 's': 2, 'n': 5, 'm': 'quiz'})
    r['miss']['y'] = {'n': 3}; r['lab']['L'] = {'n': 3, 'best': 60, 'last': 60, 'd': 101}; r['newd'] = {'d': 101, 'n': 4}; r['plan'] = 400
    m = pg.evaluate('([b,l,r])=>__T.sync.merge(b,l,r,true)', [b, l, r])
    check('counters add both devices', m['days'] == {'100': 9, '101': 4}, m['days'])
    check('cards: changed card kept, new card added', m['cards'] == {'a': {'b': 2, 'd': 104, 'n': 2}, 'b': {'b': 1, 'd': 102, 'n': 1}}, m['cards'])
    check('quiz history from both kept', len(m['quiz']['T']) == 3 and [q['d'] for q in m['quiz']['T']] == [100, 101, 101], m['quiz'])
    check('fixed mistake stays fixed, other mistake updated', m['miss'] == {'y': {'n': 3}}, m['miss'])
    check('lab runs add, best is max', m['lab']['L']['n'] == 4 and m['lab']['L']['best'] == 70, m['lab'])
    check('new cards today add', m['newd'] == {'d': 101, 'n': 7}, m['newd'])
    check('exam plan set on other device carried', m['plan'] == 400, m['plan'])
    nb = pg.evaluate('([l,r])=>__T.sync.merge(null,l,r,false)', [l, r])
    check('no base: counters take the larger, nothing doubled', nb['days'] == {'100': 8, '101': 4}, nb['days'])
    check('no base: identical history not duplicated', len(nb['quiz']['T']) == 3, nb['quiz'])
    rs = pg.evaluate('([b,l])=>__T.sync.merge(b,{days:{},cards:{},quiz:{},miss:{},lab:{}},l,true)', [b, b])
    check('reset on one device carries across', rs['days'] == {} and rs['cards'] == {} and rs['quiz'] == {}, rs)
    pg.close()

    # ---------- two devices ----------
    def device(days):
        ctx = br.new_context(); ctx.route('https://accounts.google.com/**', gis); ctx.route('https://www.googleapis.com/**', drive)
        pg = ctx.new_page(); errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
        pg.add_init_script("if(!localStorage.getItem('ppl-hub-v1'))localStorage.setItem('ppl-hub-v1',JSON.stringify({days:%s}))" % json.dumps(days))
        pg.goto(URL); pg.wait_for_timeout(300); pg.evaluate("__T.sync.cid('test-client')")
        return pg, errs
    def prog(pg): pg.locator('button.nv:visible:has-text("Progress")').first.click(); pg.wait_for_timeout(200)
    def connect(pg):
        prog(pg); pg.locator('#sy-card [data-a="sync"]').click(); pg.wait_for_timeout(400)
        if pg.evaluate("!(window.google&&google.accounts)"): pg.wait_for_timeout(500)
        if pg.locator('#sy-card .systat').count() == 0: pg.locator('#sy-card [data-a="sync"]').click()
        pg.wait_for_timeout(600)
    def days(pg): return pg.evaluate("__T.S.days['500']")
    def study(pg, n): pg.evaluate("n=>{__T.S.days['500']=(__T.S.days['500']||0)+n}", n)
    def sync(pg): pg.evaluate("__T.sync.now(true)"); pg.wait_for_timeout(500)

    A, ea = device({'500': 5}); B, eb = device({'500': 2})
    prog(A); check('sync card offered', A.locator('#sy-card').count() == 1 and 'Connect Google account' in A.locator('#sy-card').inner_text())
    connect(A)
    check('phone connected and uploaded', remote() and remote()['days']['500'] == 5, remote())
    check('status says synced', 'Synced' in A.locator('#sy-card').inner_text(), A.locator('#sy-card').inner_text())
    check('first sign-in asked for consent', A.evaluate('window.__prompts') == ['consent'], A.evaluate('window.__prompts'))
    connect(B)
    check('tablet joins: larger count kept, no doubling', days(B) == 5 and remote()['days']['500'] == 5, (days(B), remote()['days']))
    study(A, 3); sync(A); study(B, 4); sync(B)
    check('both devices studied: answers added (5+3+4)', days(B) == 12 and remote()['days']['500'] == 12, (days(B), remote()['days']))
    sync(A); check('phone catches up', days(A) == 12, days(A))
    check('only one sync file', len(DRIVE) == 1, DRIVE.keys())

    # Today chip, expired sign-in, reconnect from the chip
    A.locator('button.nv:visible:has-text("Today")').first.click(); A.wait_for_timeout(200)
    check('Today shows sync chip', 'Synced' in A.locator('#sy-chip').inner_text(), A.locator('#sy-chip').count())
    A.evaluate("localStorage.setItem('pplsync-tok',JSON.stringify({t:'old',exp:Date.now()-1000}))"); study(A, 1); A.evaluate("__T.sync.now(false)"); A.wait_for_timeout(300)
    check('expired sign-in asks for a tap', 'Tap to sync' in A.locator('#sy-chip').inner_text(), A.locator('#sy-chip').inner_text())
    A.locator('#sy-chip').click(); A.wait_for_timeout(700)
    check('tap reconnects and syncs without consent screen', remote()['days']['500'] == 13 and A.evaluate('window.__prompts')[-1] == '', (remote()['days'], A.evaluate('window.__prompts')))
    A.set_viewport_size({'width': 430, 'height': 900}); A.screenshot(path='/tmp/sync_today.png')
    prog(A); A.locator('#sy-card').scroll_into_view_if_needed(); A.screenshot(path='/tmp/sync_card.png')

    # turning off on one device leaves the other syncing
    A.locator('#sy-card [data-a="syncoff"]').click(); A.wait_for_timeout(200)
    check('turn off shows connect again', 'Connect Google account' in A.locator('#sy-card').inner_text())
    study(B, 2); sync(B); check('other device still syncs', remote()['days']['500'] == 15, remote()['days'])
    check('no page errors', not ea and not eb, ea + eb)
    br.close()
print('ALL PASS' if not fails else 'FAILED: %s' % fails)
