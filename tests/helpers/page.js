
// All ops are async in puppeteer
// const puppeteer = require('puppeteer');   // To Launch a new chromium instance
const puppeteer = require('puppeteer');

const sessionFactory = require('../factories/sessionFactory');
const userFactory = require('../factories/userFactory');

class CustomPage {
  constructor(page) {
    this.page = page;
    // this.browser = browser;
  }

  static async build() {
    const browser = await puppeteer.launch({
      headless: false
    });

    const page = await browser.newPage();
    const customPage = new CustomPage(page);

    return new Proxy(customPage, {
      get: function(target, property) {
        return customPage[property] || browser[property] || page[property];
      }
    })
  }

  // close() {
  //   this.browser.close();
  // }

  async login() {
    const user = await userFactory();
    const { sessionString, sessionSign } = sessionFactory(user);

    await this.page.setCookie({ name: 'session', value: sessionString });
    await this.page.setCookie({ name: 'session.sig', value: sessionSign });

    await this.page.goto('localhost:3000/blogs');
    await this.page.waitFor('a[href="/auth/logout"]');
  }

  async getContent(selector) {
    return this.page.$eval(selector, el => el.innerHTML);
  }
}

module.exports = CustomPage;
