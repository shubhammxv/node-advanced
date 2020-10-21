
// All ops are async in puppeteer
const puppeteer = require('puppeteer');   // To Launch a new chromium instance

// test('Adds two numbers', () => {
//   const sum = 1 + 2;
//   expect(sum).toEqual(3);     // assert, should
// })

let browser, page;

// Runs before every test
beforeEach(async () => {
  // Making headless false we can see gui in screen
  // Normally run in headless mode; makes tests run faster
  browser = await puppeteer.launch({
    headless: false
  });

  //Creating a new tab in browser instance
  page = await browser.newPage();
  // Navigate to localhost in tab
  await page.goto('localhost:3000');
})

// Runs after each test; like a cleanup for browser instances
afterEach(async () => {
  // Close the running browser instance
  await browser.close();
})

test('Header has correct text', async () => {
  // Extracting text from logo using css selector
  const text = await page.$eval('a.brand-logo', el => el.innerHTML);
  expect(text).toEqual('Blogster');
})

test('Clicking login starts OAuth flow', async () => {
  await page.click('.right a');
  const pageUrl = await page.url();

  expect(pageUrl).toMatch(/accounts\.google\.com/);
})
