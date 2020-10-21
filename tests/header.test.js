
// All ops are async in puppeteer
const puppeteer = require('puppeteer');   // To Launch a new chromium instance

test('Adds two numbers', () => {
  const sum = 1 + 2;
  expect(sum).toEqual(3);     // assert, should
})

test('Can launch a browser', async () => {
  // Making headless false we can see gui in screen
  // Normally run in headless mode; makes tests run faster
  const browser = await puppeteer.launch({
    headless: false
  });

  //Creating a new tab in browser instance
  const page = await browser.newPage();

  // Navigate to localhost in tab
  await page.goto('localhost:3000');

  // Extracting text from logo using css selector
  const text = await page.$eval('a.brand-logo', el => el.innerHTML);
  expect(text).toEqual('Blogster');
})
