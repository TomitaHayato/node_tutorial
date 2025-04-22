import { chromium } from "@playwright/test";

// @see セレクターのチェーンの利用方法(>>)
// https://playwright.dev/docs/selectors#chaining-selectors

(async () => {
  const browser = await chromium.launch({ slowMo: 500 });
  const page = await browser.newPage();
  await page.goto("http://localhost:3000");

  // CSS セレクターで要素を取得
  const pageNameLocatorParent = page.locator(".cards.list-group-item");
  const pageNameLocator = pageNameLocatorParent.locator('..')
  const pageTitle = await pageNameLocator.innerText();
  console.log(pageTitle);

  await browser.close();
})();
