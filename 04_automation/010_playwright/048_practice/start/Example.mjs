import { chromium } from "@playwright/test";

/**
 * 練習問題
 * [佐藤]で検索して、一番最後に出てくる人物の名前を取得してください。
 */
(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 500 });
  const page = await browser.newPage();
  await page.goto("http://localhost:3000");
  await page.waitForTimeout(800);

  const inputEl = page.locator('xpath=//*[@id="__next"]/div/div[1]/label/input');
  await inputEl.type('佐藤');

  if(await page.locator('.page-link.page-number').count() > 1) {
    const pagerLast = page.locator('.page-link.page-number >> nth=-1');
    await pagerLast.click();
  }

  const nameLinkParentLast = page.locator('.cards.list-group-item >> nth=-1');
  const nameLinkLast       = nameLinkParentLast.locator('a');
  const nameLinkText       = await nameLinkLast.textContent();
  console.log(nameLinkText);

  await browser.close();

})();
