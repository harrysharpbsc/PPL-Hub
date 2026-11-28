"""The source line after an answer ("From your note 03: ... / Show the note") in mock and review. Run from src/.
Refs are planted at run time on every item, so this checks the plumbing whatever the content has."""
import os
from playwright.sync_api import sync_playwright
PLANT = """(()=>{const N=__T.NOTES;N.forEach(n=>{const r={sec:n.sections[0][0].slice(0,8),rule:'SERA.9999'};
 n.quiz.forEach(q=>{q[4]=r});n.cl.forEach(c=>{c.ref=r})});return N.length})()"""
with sync_playwright() as p:
    b = p.chromium.launch()
    for w in (430, 800, 1100):
        pg = b.new_page(viewport={'width': w, 'height': 1000}); errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
        pg.goto('file://' + os.getcwd() + '/hub_test.html'); pg.wait_for_timeout(300)
        assert pg.evaluate(PLANT) > 30
        # mock exam, feedback as you go
        pg.locator('button.nv:visible:has-text("Practice")').first.click(); pg.locator('[data-a="mfb"][data-v="now"]').click()
        pg.locator('[data-a="mock"]').first.click(); pg.wait_for_timeout(150)
        i0 = pg.evaluate('__T.ses.i'); pg.locator('.opt').first.click()
        line = pg.locator('.refl .m').first.inner_text()
        n = pg.evaluate('__T.NOTES[__T.ses.qs[__T.ses.i].n]')
        assert line.startswith('From ') and n['sections'][0][0] in line and 'SERA.9999' in line, line
        if n.get('num'): assert ('your note %02d' % n['num']) in line, line
        pg.locator('[data-a="refx"]').first.click(); pg.wait_for_timeout(100)
        assert pg.locator('.refb li').count() == len(n['sections'][0][1]), 'section shown in place'
        assert pg.evaluate('__T.ses&&__T.ses.mode') == 'mock' and pg.evaluate('__T.ses.i') == i0, 'quiz in progress is kept'
        assert pg.locator('[data-a="refx"]').first.inner_text() == 'Hide the note'
        over = pg.evaluate("[].filter.call(document.querySelectorAll('.refl,.refl *'),e=>{const c=e.closest('.card,.fb');if(!c)return false;const r=e.getBoundingClientRect(),q=c.getBoundingClientRect();return r.right>q.right+1||r.left<q.left-1}).length")
        assert over == 0, 'source line overflows its card at %d px' % w
        pg.screenshot(path='ref_mock_%d.png' % w, full_page=True)
        pg.locator('[data-a="refx"]').first.click()
        # flashcard review
        pg.evaluate("__T.render()")
        pg.locator('[data-a="end"]').first.click(); pg.wait_for_timeout(100)
        pg.locator('button.nv:visible:has-text("Today")').first.click()
        pg.locator('[data-a="review"]').first.click(); pg.wait_for_timeout(100)
        assert pg.locator('.refl').count() == 0, 'no source before the answer is shown'
        pg.locator('[data-a="show"]').first.click(); pg.wait_for_timeout(100)
        assert pg.locator('.refl .m').first.inner_text().startswith('From '), 'source on the card back'
        pg.screenshot(path='ref_card_%d.png' % w, full_page=True)
        assert not errs, errs
        print(w, 'ok |', line)
    print('PASS ref')
