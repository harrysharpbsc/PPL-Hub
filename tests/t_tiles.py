import asyncio,os,math,io,re
from PIL import Image,ImageDraw
from playwright.async_api import async_playwright
LAT,LON=51.8747,-0.3683
def tilexy(z,lat,lon):
    n=2**z; x=(lon+180)/360*n; y=(1-math.log(math.tan(math.radians(lat))+1/math.cos(math.radians(lat)))/math.pi)/2*n; return x,y
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(); pg=await b.new_page(viewport={'width':1024,'height':768})
    hits=[]
    async def h(route):
        m=re.search(r'/tile/(\d+)/(\d+)/(\d+)',route.request.url); z,y,x=map(int,m.groups())
        im=Image.new('RGB',(256,256),(40,70,40)); d=ImageDraw.Draw(im); d.rectangle([0,0,255,255],outline=(255,255,0))
        fx,fy=tilexy(z,LAT,LON)
        if int(fx)==x and int(fy)==y:
            px,py=(fx-x)*256,(fy-y)*256; d.ellipse([px-5,py-5,px+5,py+5],fill=(255,0,0)); hits.append((z,x,y))
        bio=io.BytesIO(); im.save(bio,'PNG'); await route.fulfill(body=bio.getvalue(),content_type='image/png')
    await pg.route('**arcgisonline.com/**',h)
    errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    await pg.goto('file://'+os.getcwd()+'/hub_test.html')
    await pg.locator('button.nv:visible:has-text("Labs")').first.click()
    await pg.locator('[data-id="ukmap"]').click()
    await pg.locator('[data-k="base"][data-v="esri"]').click()
    await pg.wait_for_timeout(500)
    await pg.screenshot(path='tile0.png')
    await pg.locator('input.ukq').fill('Luton'); await pg.wait_for_timeout(1200)
    await pg.screenshot(path='tile1.png')
    print(hits[-3:],await pg.locator('#uk-attr').inner_text(),errs, await pg.evaluate("document.querySelectorAll('#uk-tiles image').length"))
    await b.close()
asyncio.run(main())
