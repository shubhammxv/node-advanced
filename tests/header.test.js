
const Page = require('./helpers/page');   // CustomPage; Wraps everything we do with puppeteer

let page;

beforeEach(async () => {
  page = await Page.build();      // CustomPage
  await page.goto('localhost:3000');
})

afterEach(async () => {
  await page.close();
})

test('Header has correct text', async () => {
  // Extracting text from logo using css selector
  const text = await page.getContent('a.brand-logo');
  expect(text).toEqual('Blogster');
})

test('Clicking login starts OAuth flow', async () => {
  await page.click('.right a');
  const pageUrl = await page.url();

  expect(pageUrl).toMatch(/accounts\.google\.com/);
})

// .only will run only below test
test.only('When signed in, shows logout', async () => {
  // Logging In using custom page and fn defined
  await page.login();

  const text = await page.getContent('a[href="/auth/logout"]');
  expect(text).toEqual('Logout');
})
