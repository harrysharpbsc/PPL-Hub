import asyncio,os
from playwright.async_api import async_playwright
PLANS={
0:[(0,'altT',4000),(0,'hT',56)],
1:[(0,'hT',90),(0,'altT',2000),(52,'hT',30)],
2:[(0,'hT',90)],
3:[(0,'altT',2000)],
}
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(); pg=await b.new_page()
    errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    await pg.goto('file://'+os.getcwd()+'/hub_test.html')
    await pg.locator('button.nv:visible:has-text("Labs")').first.click()
    await pg.locator('[data-id="inf"]').click()
    for ix in range(4):
      await pg.locator('[data-k="go"]').click()
      res=await pg.evaluate("""(plan)=>{var s=__T.ses;var t=0,i=0;plan.sort((a,b)=>a[0]-b[0]);
        while(s.run&&t<400){while(i<plan.length&&plan[i][0]<=t){s[plan[i][1]]=plan[i][2];i++}s.step(0.05);t+=0.05}
        return {over:s.over?JSON.stringify(s.over).slice(0,120):null,t:t,x:s.x,y:s.y,alt:s.alt}}""",[list(x) for x in PLANS[ix]])
      print(ix,res)
      # also check naive straight flight fails (except 3?) 
      await pg.locator('[data-k="next"]').click()
    print(await pg.locator('.score').inner_text(), errs)
    # naive check: straight flight each scenario
    await pg.locator('[data-k="again"]').click()
    for ix in range(4):
      await pg.locator('[data-k="go"]').click()
      res=await pg.evaluate("""()=>{var s=__T.ses;var t=0;while(s.run&&t<400){s.step(0.05);t+=0.05}return s.over?JSON.stringify(s.over).slice(0,100):'none'}""")
      print('naive',ix,res)
      await pg.locator('[data-k="next"]').click()
    await b.close()
asyncio.run(main())
