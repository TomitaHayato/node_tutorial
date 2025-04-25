// locator: ページ上の特定の要素を取得するもの
import { chromium } from "@playwright/test";

(async() => {
  // ブラウザを立ち上げ、1つのタブを返す
  const browser = await chromium.launch();
  // 新しいページを立ち上げる
  const page = await browser.newPage();
  // URLに遷移する
  await page.goto('http://localhost:3000');
  // ページのHTMLを取得
  // const htmlStr = await page.content();

  // cssクラスで取得
  const pageTitleLocator = await page.locator('.navbar-brand');
  const pageTitle = await pageTitleLocator.innerText();
  // console.log(pageTitle);

  // 文字列で取得
  const textLocator = await page.locator('text=名刺管理アプリ');
  const titleText   = await textLocator.innerText();
  // console.log(titleText);

  // xpathで取得（クラスやIDがない要素を取得する際に使用する）
  const xpathLocator = await page.locator('xpath=//*[@id="__next"]/nav/div/a');
  const titleXpath   = await xpathLocator.innerText();
  // console.log(titleXpath);

  // ブラウザを閉じる
  await browser.close();
})();
