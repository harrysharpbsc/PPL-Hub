import asyncio,os
from playwright.async_api import async_playwright
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch()
    for w,hh in [(1024,768),(390,800)]:
      pg=await b.new_page(viewport={'width':w,'height':hh})
      errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
      await pg.goto('file://'+os.getcwd()+'/hub_test.html')
      await pg.locator('button.nv:visible:has-text("Labs")').first.click()
      # wb
      await pg.locator('[data-id="wb"]').click()
      if w==390: await pg.screenshot(path='s3_wb.png',full_page=True)
      await pg.locator('button:has-text("Tasks")').click()
      sols=[(30,40),(20,200),None,None]
      for i in range(4):
        if sols[i]:
          await pg.locator('input[data-f="fu"]').fill(str(sols[i][0])); await pg.locator('input[data-f="b"]').fill(str(sols[i][1]))
          await pg.locator('[data-k="chk"]').click()
        else:
          await pg.locator('[data-k="no"]').click()
        await pg.locator('[data-k="n"]').click()
      print(w,'wb',await pg.locator('.score').inner_text())
      await pg.locator('button:has-text("Done")').click()
      # ls
      await pg.locator('[data-id="ls"]').click()
      await pg.locator('input[data-f="b"]').fill('60'); print(w,'ls',(await pg.locator('#ls-out').inner_text()).replace('\n',' | '))
      if w==390: await pg.screenshot(path='s3_ls.png',full_page=True)
      await pg.locator('button:has-text("Challenge")').click()
      for i in range(5):
        a=await pg.evaluate("__T.ses.cq[__T.ses.ci].ans")
        await pg.locator('.opt[data-v="%s"]'%a).click(); await pg.locator('[data-k="n"]').click()
      print(w,'ls chal',await pg.locator('.score').inner_text())
      await pg.locator('button:has-text("Done")').click()
      # scen
      await pg.locator('[data-id="scen"]').click()
      for si in range(3):
        await pg.locator('[data-k="pick"][data-v="%d"]'%si).click()
        for st in range(8):
          if await pg.locator('.score').count(): break
          # choose best option: find index with max p
          idx=await pg.evaluate("(function(){var s=__T.ses;return 0})()")
          await pg.locator('.lev .opt').first.click(); await pg.locator('[data-k="n"]').click()
        print(w,'scen',si,await pg.locator('.score').inner_text())
        await pg.locator('[data-k="menu"]').click()
      await pg.locator('button.xb').click()
      # goNo
      await pg.locator('[data-id="goNo"]').click(); await pg.locator('[data-k="go"]').click()
      if w==390: await pg.screenshot(path='s3_go.png',full_page=True)
      for i in range(8):
        idx=await pg.evaluate("(function(){var s=__T.ses;return s.items[s.i].a})()")
        await pg.locator('.lev .opt').nth(idx).click(); await pg.locator('[data-k="n"]').click()
      print(w,'goNo',await pg.locator('.score').inner_text())
      await pg.locator('button:has-text("Done")').click()
      # chk
      await pg.locator('[data-id="chk"]').click(); await pg.locator('[data-k="go"]').click()
      for i in range(6):
        n=await pg.evaluate("__T.ses.items[__T.ses.i].ans.length")
        for j in range(n): await pg.locator('.lev .chipb[data-v="%d"]'%j).click()
        if w==390 and i==0: await pg.screenshot(path='s3_chk.png',full_page=True)
        await pg.locator('[data-k="chk"]').click(); await pg.locator('[data-k="n"]').click()
      print(w,'chk',await pg.locator('.score').inner_text(),errs)
    await b.close()
asyncio.run(main())
