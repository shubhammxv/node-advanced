
const Page = require('./helpers/page');

let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto('localhost:3000');
})

afterEach(async () => {
  await page.close();
})

test('When logged in, can see blog create form', async () => {
  await page.login();
  await page.click('a.btn-floating');

  const text = page.getContent('form label');
  expect(text).toEqual('Blog Title');
})
