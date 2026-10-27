import asyncio,os,sys
from playwright.async_api import async_playwright
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch()
    for w,hh in [(1024,768),(390,800)]:
      pg=await b.new_page(viewport={'width':w,'height':hh})
      errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
      await pg.goto('file://'+os.getcwd()+'/hub_test.html')
      await pg.locator('button.nv:visible:has-text("Labs")').first.click()
      for lid in ['row','chart','alt','inst']:
        await pg.locator('[data-id="%s"]'%lid).click(); await pg.locator('[data-k="go"]').click()
        for q in range(12):
          if await pg.locator('.score').count(): break
          if w==390 and lid in('row','chart','alt') and q==1: await pg.screenshot(path='s2_%s.png'%lid,full_page=True)
          it=await pg.evaluate("(function(){var i=__T.ses.items[__T.ses.i];return {k:i.kind,a:i.a}})()")
          if it['k']=='tap': await pg.locator('.lev g.hot[data-v="%s"]'%it['a']).click()
          else:
            idx=await pg.evaluate("(function(){var s=__T.ses;return s.ord.indexOf(s.items[s.i].a)})()")
            await pg.locator('.lev .opt').nth(idx).click()
          await pg.locator('[data-k="n"]').click()
        print(w,lid,await pg.locator('.score').inner_text())
        await pg.locator('button:has-text("Done")').click()
      # wind
      await pg.locator('[data-id="wind"]').click()
      if w==390: await pg.screenshot(path='s2_wind.png',full_page=True)
      await pg.locator('input[data-f="ws"]').fill('30')
      print(w,'wind out',(await pg.locator('#wind-out').inner_text()).replace('\n',' | '))
      await pg.locator('button:has-text("Challenge")').click()
      for q in range(5):
        ans=await pg.evaluate("__T.ses.cq[__T.ses.ci].ans")
        await pg.locator('.opt[data-v="%s"]'%ans).click(); await pg.locator('[data-k="n"]').click()
      print(w,'wind chal',await pg.locator('.score').inner_text(),errs)
    await b.close()
asyncio.run(main())
