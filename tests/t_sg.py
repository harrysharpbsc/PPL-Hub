import os
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':900,'height':700})
    pg.goto('file://'+os.getcwd()+'/hub_test.html')
    pg.locator('button.nv:visible:has-text("Labs")').first.click()
    pg.locator('[data-id="signs"]').click();pg.locator('[data-k="go"]').click()
    svgs=[]
    for q in range(12):
        svgs.append(pg.evaluate("(function(){var i=__T.ses.items[__T.ses.i];return (i.svg||'')+'<p>'+i.q+' = '+i.opts[i.a]+'</p>'})()"))
        idx=pg.evaluate("(function(){var s=__T.ses;return s.ord.indexOf(s.items[s.i].a)})()")
        pg.locator('.lev .opt').nth(idx).click();pg.locator('[data-k="n"]').click()
    open('sg.html','w').write('<body style="width:880px;background:#eee"><style>svg{width:260px}div{display:inline-block;width:280px;vertical-align:top;font:11px sans-serif}</style>'+''.join('<div>%s</div>'%s for s in svgs))
    pg.goto('file://'+os.getcwd()+'/sg.html');pg.screenshot(path='sg.png',full_page=True)
