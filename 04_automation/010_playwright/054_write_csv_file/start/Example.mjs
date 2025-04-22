import { chromium } from "@playwright/test";
import * as fs from "fs";
import { Parser } from "json2csv";
import { parseEnv } from "util";

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 500 });
  const page = await browser.newPage();
  await page.goto("http://localhost:3000");

  const cardLocator = page.locator(".cards.list-group-item");
  const cardCount   = await cardLocator.count();
  console.log(cardCount);

  const cardList = []
  for(let i = 0; i < cardCount; i++) {
    // text取得
    const cardEl = page.locator(`.cards.list-group-item >> nth=${i}`);
    const cardText = await cardEl.textContent();
    // 配列に追加。csvに変換するために、Object形式で追加
    cardList.push({
      name: cardText,
    });
  }

  console.log(cardList);

  await browser.close();

  const parser = new Parser;
  // csv形式に変換
  const csv = parser.parse(cardList);
  console.log(csv);

  fs.writeFileSync("./text-data-file.csv", csv);
})();
