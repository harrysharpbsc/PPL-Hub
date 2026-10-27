import os
from playwright.sync_api import sync_playwright
from PIL import Image
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':1000,'height':900})
    pg.goto('file://'+os.getcwd()+'/hub_test.html')
    pg.locator('button.nv:visible:has-text("Labs")').first.click()
    k=0;fs=[]
    for lid in ['xc','circ','ctlarr','ctldep']:
        for rep in range(3):
            pg.locator('[data-id="%s"]'%lid).click()
            el=pg.locator('svg.lmap');f='rm_%d.png'%k;k+=1;el.screenshot(path=f);fs.append(f)
            pg.locator('button:has-text("End")').first.click()
            pg.locator('button.nv:visible:has-text("Labs")').first.click()
    ims=[Image.open(f).resize((300,225)) for f in fs]
    o=Image.new('RGB',(900,225*4),'white')
    for i,im in enumerate(ims): o.paste(im,((i%3)*300,(i//3)*225))
    o.save('rm_montage.png')
