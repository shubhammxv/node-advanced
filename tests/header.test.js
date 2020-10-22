
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

// .only will run only below test
test.only('When signed in, shows logout', async () => {
  const { Buffer } = require('safe-buffer');
  const Keygrip = require('keygrip');
  const keys = require('../config/keys');

  // User ID existing in DB to create fake session for testing
  const userId = process.env.USER_ID;
  const sessionObj = {
    passport: {
      id: userId
    }
  };

  const sessionString = Buffer.from(
    JSON.stringify(sessionObj)
  ).toString('base64');

  const keygrip = new Keygrip([keys.cookieKey]);
  // Signing the session to check for tampering
  const sessionSign = keygrip.sign(`session=${sessionObj}`);
 
  // Setting cookie to fake auth for userId above
  await page.setCookie({ name: 'session', value: sessionString });
  await page.setCookie({ name: 'session.sig', value: sessionSign });

  // Refreshing the page to that app re renders and updated header is present
  await page.goto('localhost:3000');

  // We might goto home page, but the page might not have fully rendered to find the elements
  // Waiting for until the elements are visible; if below element not found then test fails
  await page.waitFor('a[href="/auth/logout"]');

  const text = await page.$eval('a[href="/auth/logout"]', el => el.innerHTML);
  expect(text).toEqual('Logout');
})
