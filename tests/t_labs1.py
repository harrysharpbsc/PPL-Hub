import asyncio,sys
from playwright.async_api import async_playwright
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch()
    for w,hh in [(1024,768),(390,800)]:
      pg=await b.new_page(viewport={'width':w,'height':hh})
      errs=[]
      pg.on('pageerror',lambda e:errs.append(str(e)))
      pg.on('console',lambda m:errs.append(m.text) if m.type=='error' and 'fonts' not in m.text and 'ERR_' not in m.text else None)
      await pg.goto('file://'+__import__('os').getcwd()+'/hub_test.html')
      await pg.locator('button.nv:visible:has-text("Labs")').first.click()
      print(w,'labs list', (await pg.locator('.pick').count()))
      # xc lab
      await pg.locator('[data-id="xc"]').click()
      await pg.locator('[data-k="go"]').click()
      n=0
      while n<40:
        await pg.wait_for_timeout(300)
        fin=await pg.locator('.score').count()
        if fin: break
        if await pg.locator('.lev .opt').count():
          # choose correct via __T
          a=await pg.evaluate("__T.ses.cur.a")
          txt=await pg.evaluate("__T.ses.cur.opts[__T.ses.cur.a]")
          await pg.locator('.lev .opt:has-text("%s")'%txt[:25].replace('"','')).first.click()
          await pg.locator('[data-k="n"]').click(); n+=1
        elif await pg.locator('.lev .chipb').count():
          ans=await pg.evaluate("__T.ses.cur.ans")
          for t in ans:
            await pg.locator('.lev .chipb:not([disabled])',has_text=t).first.click() if False else None
          # click by index data-v matching answer order
          nb=len(ans)
          for i in range(nb):
            await pg.locator('.lev .chipb[data-v="%d"]'%i).click()
          await pg.locator('[data-k="chk"]').click()
          await pg.locator('[data-k="n"]').click(); n+=1
      print('xc score',await pg.locator('.score').inner_text(), 'events',n)
      await pg.screenshot(path='shot_xc_%d.png'%w)
      await pg.locator('button:has-text("Done")').click()
      # circuit
      await pg.locator('[data-id="circ"]').click(); await pg.locator('[data-k="go"]').click()
      n=0
      while n<40:
        await pg.wait_for_timeout(250)
        if await pg.locator('.score').count(): break
        if await pg.locator('.lev .opt').count():
          txt=await pg.evaluate("__T.ses.cur.opts[__T.ses.cur.a]")
          await pg.locator('.lev .opt:has-text("%s")'%txt[:25]).first.click()
          if n==2: await pg.screenshot(path='shot_circ_%d.png'%w)
          await pg.locator('[data-k="n"]').click(); n+=1
        elif await pg.locator('.lev .chipb').count():
          ans=await pg.evaluate("__T.ses.cur.ans")
          for i in range(len(ans)): await pg.locator('.lev .chipb[data-v="%d"]'%i).click()
          await pg.locator('[data-k="chk"]').click(); await pg.locator('[data-k="n"]').click(); n+=1
      print('circ score',await pg.locator('.score').inner_text(),n)
      await pg.locator('button:has-text("Done")').click()
      print(errs)
    await b.close()
asyncio.run(main())
