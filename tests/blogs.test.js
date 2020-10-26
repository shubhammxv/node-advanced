
const Page = require('./helpers/page');

let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto('localhost:3000');
})

afterEach(async () => {
  await page.close();
})

describe('When logged in', async () => {
  // Before each statement; logging in and clicking blog creation
  // Only for this scope of describe
  beforeEach(async () => {
    await page.login();
    await page.click('a.btn-floating');
  })

  test('Can see blog create form', async () => {
    const text = page.getContent('form label');
    expect(text).toEqual('Blog Title');
  })
})
