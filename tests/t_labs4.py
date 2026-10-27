import asyncio,os
from playwright.async_api import async_playwright
async def quiz(pg,lid,w,shot=None):
  await pg.locator('[data-id="%s"]'%lid).click(); await pg.locator('[data-k="go"]').click()
  for q in range(12):
    if await pg.locator('.score').count(): break
    if shot and q==shot[1]: await pg.screenshot(path=shot[0],full_page=True)
    idx=await pg.evaluate("(function(){var s=__T.ses;return s.ord.indexOf(s.items[s.i].a)})()")
    await pg.locator('.lev .opt').nth(idx).click(); await pg.locator('[data-k="n"]').click()
  print(w,lid,await pg.locator('.score').inner_text())
  await pg.locator('button:has-text("Done")').click()
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch()
    for w,hh in [(1024,768),(390,800)]:
      pg=await b.new_page(viewport={'width':w,'height':hh})
      errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
      await pg.goto('file://'+os.getcwd()+'/hub_test.html')
      await pg.locator('button.nv:visible:has-text("Labs")').first.click()
      print(w,'count',await pg.locator('.pick').count())
      await quiz(pg,'sort',w,('s4_sort.png',1))
      await quiz(pg,'daily',w,('s4_daily.png',1))
      # diagram: screenshot each of the 5 diagrams
      await pg.locator('[data-id="diag"]').click(); await pg.locator('[data-k="go"]').click()
      for q in range(10):
        if w==390 and q<6: await pg.screenshot(path='s4_diag%d.png'%q)
        idx=await pg.evaluate("(function(){var s=__T.ses;return s.ord.indexOf(s.items[s.i].a)})()")
        await pg.locator('.lev .opt').nth(idx).click(); await pg.locator('[data-k="n"]').click()
      print(w,'diag',await pg.locator('.score').inner_text()); await pg.locator('button:has-text("Done")').click()
      # match
      await pg.locator('[data-id="match"]').click(); await pg.locator('[data-k="pick"][data-v="0"]').click()
      if w==390: await pg.screenshot(path='s4_match.png',full_page=True)
      # first wrong tap then correct
      for r in range(6):
        i=r
        await pg.locator('.mgrid [data-k="L"]:not([disabled])').first.click()
        sel=await pg.evaluate("__T.ses.selL")
        await pg.locator('.mgrid [data-k="R"][data-v="%d"]'%sel).click()
      print(w,'match',await pg.locator('.score').inner_text(),errs)
    await b.close()
asyncio.run(main())
