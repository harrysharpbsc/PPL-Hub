import asyncio,sys,os
from playwright.async_api import async_playwright
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch()
    pg=await b.new_page(viewport={'width':390,'height':844})
    await pg.goto('file://'+os.getcwd()+'/hub_test.html')
    await pg.locator('button.nv:visible:has-text("Labs")').first.click()
    await pg.screenshot(path='s_list.png')
    await pg.locator('[data-id="xc"]').click(); await pg.locator('[data-k="go"]').click()
    await pg.wait_for_selector('.lev .chipb'); 
    await pg.screenshot(path='s_xc1.png',full_page=True)
    await pg.evaluate("__T.ses.d=0")
    await pg.locator('button:has-text("End")').click()
    await pg.locator('[data-id="circ"]').click(); await pg.locator('[data-k="go"]').click()
    await pg.wait_for_selector('.lev .chipb'); 
    await pg.locator('.lev .chipb').first.click()
    await pg.screenshot(path='s_circ1.png',full_page=True)
    await pg.locator('button:has-text("End")').click()
    await pg.locator('[data-id="inf"]').click()
    await pg.screenshot(path='s_inf0.png',full_page=True)
    await pg.locator('[data-k="go"]').click()
    await pg.wait_for_timeout(3000)
    await pg.screenshot(path='s_inf1.png',full_page=True)
    await b.close()
asyncio.run(main())
