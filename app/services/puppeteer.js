const genericPool = require("generic-pool");

const puppeteer = require("puppeteer");

const puppeteerPool = function (opts) {
  const factory = {
    create: async function () {
      const browser = await puppeteer.launch({
        headless: false,
        args: ["--no-sandbox"],

        ...opts.puppeteer,
      });

      return browser;
    },

    destroy: function (browser) {
      browser.close();
    },
  };

  return genericPool.createPool(factory, opts);
};

module.exports = puppeteerPool;
