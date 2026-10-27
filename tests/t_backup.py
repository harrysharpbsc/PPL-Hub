import os,json
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    br=p.chromium.launch();ctx=br.new_context(accept_downloads=True);pg=ctx.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('http://localhost:8767/hub_test.html');pg.wait_for_timeout(300)
    pg.evaluate("localStorage.setItem('ppl-fs',JSON.stringify({pace:'skip',eng:'rich'}));localStorage.setItem('other','x')")
    pg.locator('button.nv:visible:has-text("Progress")').first.click();pg.wait_for_timeout(200)
    with pg.expect_download() as d: pg.locator('[data-a="backup"]').click()
    path=d.value.path();j=json.load(open(path));print(d.value.suggested_filename,sorted(j['data'].keys()))
    pg.evaluate("localStorage.clear()");pg.reload();pg.wait_for_timeout(300)
    pg.locator('button.nv:visible:has-text("Progress")').first.click();pg.wait_for_timeout(200)
    pg.set_input_files('#restore-file',path);pg.wait_for_timeout(1800)
    print('restored fs',pg.evaluate("localStorage.getItem('ppl-fs')"),'hub key',bool(pg.evaluate("localStorage.getItem('ppl-hub-v1')")))
    open('/tmp/claude-0/-home-claude/558a3edc-86fe-5e9d-8495-aab074e535e7/scratchpad/bad.json','w').write('{"x":1}')
    pg.locator('button.nv:visible:has-text("Progress")').first.click();pg.wait_for_timeout(200)
    pg.set_input_files('#restore-file','/tmp/claude-0/-home-claude/558a3edc-86fe-5e9d-8495-aab074e535e7/scratchpad/bad.json');pg.wait_for_timeout(300)
    print('toast',pg.locator('#toast').text_content());pg.screenshot(path='/tmp/claude-0/-home-claude/558a3edc-86fe-5e9d-8495-aab074e535e7/scratchpad/bk.png',full_page=False)
    print('errors',errs)
