import { chromium } from "@playwright/test";
import * as fs from 'fs';
import { Parser } from "json2csv";

/**
 * 練習問題
 * 3ページ目の 役職が係長の 人物名と会社名 をすべて test-data.csvに出力しなさい。
 * ※会社名が取れない場合にも処理が止まらないように例外処理を追加してください。
 * 
 * "company","name"
 * "山本金属株式会社","28 伊藤 友美"
 */
(async () => {
  const browser = await chromium.launch();
  const page    = await browser.newPage();
  await page.goto('http://localhost:3000');

  // 3ページ目に移動
  await page.locator('.page-link.page-number >> nth=2').click();

  const cardsLocator = page.locator('.cards.list-group-item');
  const cardsCount   = await cardsLocator.count();

  const infoList = [];

  for(let i = 0; i < cardsCount; i++) {
    await cardsLocator.locator(`nth=${i} >> a`).click();
    const divisionText = await page.locator('.card-subtitle.mb-2.text-muted.division').textContent();
    if(divisionText.includes('係長')) {
      const name    = await page.locator('.card-text.name').textContent();
      let company = ''
      try{
        company = await page.locator('.card-title.company').textContent();
      } catch {}

      infoList.push({
        company: company,
        name: name,
      });
    }
    await page.locator('text=戻る').click();
  }

  const parser = new Parser;
  const csv    = parser.parse(infoList);

  console.log(csv);

  fs.writeFileSync('test-data.csv', csv)

  await browser.close();
})();
