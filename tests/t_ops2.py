import asyncio,os
from playwright.async_api import async_playwright
async def flight(pg,lid):
    await pg.locator('[data-id="%s"]'%lid).click(); await pg.locator('[data-k="go"]').click()
    n=0
    while n<40:
        await pg.wait_for_timeout(250)
        if await pg.locator('.score').count(): break
        if await pg.locator('.lev .opt').count():
            txt=await pg.evaluate("__T.ses.cur.opts[__T.ses.cur.a]")
            await pg.locator('.lev .opt',has_text=txt[:25]).first.click()
            await pg.locator('[data-k="n"]').click(); n+=1
        elif await pg.locator('.lev .chipb').count():
            ans=await pg.evaluate("__T.ses.cur.ans")
            for i in range(len(ans)): await pg.locator('.lev .chipb[data-v="%d"]'%i).click()
            await pg.locator('[data-k="chk"]').click(); await pg.locator('[data-k="n"]').click(); n+=1
    print(lid,await pg.locator('.score').inner_text(),n)
    await pg.locator('button:has-text("Done")').click()
async def quiz(pg,lid):
    await pg.locator('[data-id="%s"]'%lid).click(); await pg.locator('[data-k="go"]').click()
    for q in range(15):
        if await pg.locator('.score').count(): break
        it=await pg.evaluate("(function(){var i=__T.ses.items[__T.ses.i];return {k:i.kind,a:i.a}})()")
        idx=await pg.evaluate("(function(){var s=__T.ses;return s.ord.indexOf(s.items[s.i].a)})()")
        await pg.locator('.lev .opt').nth(idx).click()
        await pg.locator('[data-k="n"]').click()
    print(lid,await pg.locator('.score').inner_text())
    await pg.locator('button:has-text("Done")').click()
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch()
    for w in (1024,390):
      pg=await b.new_page(viewport={'width':w,'height':800})
      errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
      await pg.goto('file://'+os.getcwd()+'/hub_test.html')
      await pg.locator('button.nv:visible:has-text("Labs")').first.click()
      for l in ['ctlarr','ctldep']: await flight(pg,l)
      for l in ['join','signs','divert','join','signs','divert']: await quiz(pg,l)
      print(w,errs)
    await b.close()
asyncio.run(main())
