import asyncio,os
from playwright.async_api import async_playwright
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(); pg=await b.new_page(viewport={'width':390,'height':800})
    await pg.goto('file://'+os.getcwd()+'/hub_test.html')
    await pg.locator('button.nv:visible:has-text("Labs")').first.click()
    seen=set()
    for attempt in range(8):
      await pg.locator('[data-id="diag"]').click(); await pg.locator('[data-k="go"]').click()
      for q in range(10):
        t=await pg.locator('.lev .m').first.inner_text()
        if t not in seen:
          seen.add(t); await pg.locator('.lsv').first.screenshot(path='dg_%d.png'%len(seen))
          print(len(seen),t)
        idx=await pg.evaluate("(function(){var s=__T.ses;return s.ord.indexOf(s.items[s.i].a)})()")
        await pg.locator('.lev .opt').nth(idx).click(); await pg.locator('[data-k="n"]').click()
      await pg.locator('button:has-text("Done")').click()
      if len(seen)>=5: break
    await b.close()
asyncio.run(main())
