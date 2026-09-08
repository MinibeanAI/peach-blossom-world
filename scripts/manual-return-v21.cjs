const {chromium}=require('/Users/douer/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});try{
 const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.stack));
 await page.goto('http://127.0.0.1:4186/?v=21');await page.waitForFunction(()=>window.taoyuan?.getState().ready);
 await page.evaluate(()=>taoyuan.enterScene('overview'));await page.locator('#aerial').click();
 // Walk back by actual keyboard input, without farewell or the automatic return route.
 const deadline=Date.now()+45000;let left=false;
 await page.keyboard.down('s');
 while(Date.now()<deadline){const state=await page.evaluate(()=>taoyuan.getState());if(state.player[2]>=-42.4)break;
  const desired=9-Math.max(0,state.player[2]+50)*.1875,wantLeft=state.player[0]>desired+.08;
  if(wantLeft!==left){await page.keyboard[wantLeft?'down':'up']('a');left=wantLeft;}
  await page.waitForTimeout(100);
 }
 await page.keyboard.up('s');await page.keyboard.up('a');
 let state=await page.evaluate(()=>taoyuan.getState());assert(state.player[2]>=-42.4,JSON.stringify(state.player));assert.equal(state.scene,'cave');assert(state.returnedToCreek);assert.equal(state.homeward.length,0);assert(!state.farewellDone);assert(state.walkable);assert(state.mooredBoat.visible);
 await page.locator('#aerial').click();await page.locator('#back').click();await page.waitForTimeout(1100);await page.screenshot({path:'artifacts/manual-return-v21.png'});
 await page.getByText('登船 · 划回桃林',{exact:true}).first().click();await page.waitForFunction(()=>taoyuan.getState().sailingOut&&!taoyuan.getState().boarding,null,{timeout:12000});
 state=await page.evaluate(()=>taoyuan.getState());assert(state.boatVisible);assert.equal(state.scene,'grove');
 await page.waitForSelector('#seek-again',{timeout:60000});await page.locator('#seek-again').click();await page.waitForFunction(()=>taoyuan.getState().lostEnding,null,{timeout:60000});assert.deepEqual(errors,[]);
 console.log('PASS manual keyboard walk from village through cave, boarding without farewell, departure and lost-route ending');
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exit(1)});
