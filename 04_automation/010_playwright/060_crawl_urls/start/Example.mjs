import { chromium } from "@playwright/test";
import * as fs from "fs";
import { Parser } from "json2csv";

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 0.001 });
  const page = await browser.newPage();
  await page.goto("http://localhost:3000");

  const cardLocators = page.locator(".cards.list-group-item");
  const cardCount = await cardLocators.count();

  const fetchedCards = [];
  for(let i = 0; i < cardCount; i++) {
    const cardLocator = cardLocators.locator(`nth=${i} >> a`);
    const cardText = await cardLocator.textContent();
    // 詳細ページに遷移し、会社名を取得
    await cardLocator.click();
    const campanyText = await page.locator('.card-title.company').textContent();
    fetchedCards.push({
      campany: campanyText,
      name:       cardText,
    });
    // 一覧ページに戻る
    await page.locator('text=戻る').click();
  }
  console.log(fetchedCards);

  await browser.close();

  const parser = new Parser();
  const csv = parser.parse(fetchedCards);
  
  fs.writeFileSync("./text-data.csv", csv);
})();
