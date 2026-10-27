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
      await pg.locator('[data-id="ukmap"]').click()
      await pg.wait_for_timeout(300)
      await pg.screenshot(path='uk0_%d.png'%w)
      await pg.locator('input.ukq').fill('Luton')
      await pg.wait_for_timeout(300)
      await pg.screenshot(path='uk1_%d.png'%w,full_page=True)
      # tap centre of map
      box=await pg.locator('#ukmap').bounding_box()
      await pg.mouse.click(box['x']+box['width']/2,box['y']+box['height']/2)
      await pg.wait_for_timeout(200)
      print(w,(await pg.locator('#uk-info').inner_text())[:400].replace('\n',' | '))
      await pg.mouse.move(box['x']+100,box['y']+100);await pg.mouse.down();await pg.mouse.move(box['x']+160,box['y']+130,steps=5);await pg.mouse.up()
      print(w,'vb',await pg.evaluate("document.getElementById('ukmap').getAttribute('viewBox')"))
      await pg.locator('[data-k="zo"]').click(); await pg.locator('[data-k="reset"]').click()
      await pg.locator('[data-k="lay"][data-v="oth"]').click()
      await pg.locator('#uk-af').click()
      await pg.screenshot(path='uk2_%d.png'%w)
      print(errs)
    await b.close()
asyncio.run(main())
