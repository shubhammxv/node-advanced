
// All ops are async in puppeteer
const puppeteer = require('puppeteer');   // To Launch a new chromium instance
const sessionFactory = require('./factories/sessionFactory');

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
  const { sessionString, sessionSign } = sessionFactory(userId);

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
