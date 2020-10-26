
const Page = require('puppeteer/lib/Page');

Page.prototype.login = function() {
  // Login logic
  // Attaching method to Page prototype

  const user = await userFactory();
  const { sessionString, sessionSign } = sessionFactory(user);

  // Setting cookie to fake auth for userId above
  await this.setCookie({ name: 'session', value: sessionString });
  await this.setCookie({ name: 'session.sig', value: sessionSign });

  // Refreshing the page to that app re renders and updated header is present
  await this.goto('localhost:3000');

  // We might goto home page, but the page might not have fully rendered to find the elements
  // Waiting for until the elements are visible; if below element not found then test fails
  await this.waitFor('a[href="/auth/logout"]');

}
