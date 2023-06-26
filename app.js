const puppeteerPool = require("./app/services/puppeteer");

async function main() {
  const pool = puppeteerPool({
    puppeteer: {
      width: 1280,
      height: 960,
    },
  });

  const browser = await pool.acquire();

  const page = await browser.newPage();

  await page.goto("https://www.superpet.pe/gato/alimentos/alimento-seco");

  const btnCookies = await page.$x("//button[contains(@class,'affirm')]");
  await btnCookies[0].click();

  while (true) {
    try {
      await page.waitForXPath("//button[contains(text(),'Más resultados')]");

      const btnNext = await page.$x(
        "//button[contains(text(),'Más resultados')]"
      );

      await btnNext[0].click();
    } catch {
      break;
    }
  }
}

main();
