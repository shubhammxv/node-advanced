
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

  describe('Using Valid Inputs', async () => {
    beforeEach(async () => {
      await page.type('.title input', 'Testing title input!');
      await page.type('.content input', 'Testing content input!');
      await page.click('form button');
    })

    test('Submitting takes user to review', async () => {
      const text =  await page.getContent('h5');
      expect(text).toEqual('Please confirm your entries');
    })

    test('Saving blog adds blog to blogs page', async () => {
      await page.click('button.green');
      // Using waitFor whenever there is an API or AJAX req to backend
      await page.waitFor('.card');

      const title = await page.getContent('.card-title');
      const content = await page.getContent('p');

      expect(title).toEqual('Testing title input!');
      expect(content).toEqual('Testing content input!');
    })
  })

  describe('Using invalid inputs', async () => {
    beforeEach(async () => {
      await page.click('form button');
    })

    test('Blog form shows a validation error', async () => {
      const titleError = await page.getContent('title .red-text');
      const contentError = await page.getContent('content .red-text');

      expect(titleError).toEqual('You must provide a value');
      expect(contentError).toEqual('You must provide a value');
    })
  })
})

describe('When not logged in', async () => {
  test('Can\'t create a blog post', async () => {
    const result = await page.evaluate(
      () => {
        return fetch('/api/blogs', {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title: 'My title', content: 'My Content' })
        }).then(res => res.json())
      }
    )

    expect(result).toEqual({ error: 'Not Authenticated!' });
  })
})
