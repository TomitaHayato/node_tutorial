import { chromium } from "@playwright/test";

// @see セレクターのチェーンの利用方法(>>)
// https://playwright.dev/docs/selectors#chaining-selectors

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:3000");

  // CSS セレクターで要素を取得
  const inputLocator = page.locator('xpath=//*[@id="__next"]/div/div[1]/label/input');
  await inputLocator.type('美');
  const pager3 = page.locator('.page-link.page-number >> nth=2');
  await pager3.click();

  await browser.close();

})();
