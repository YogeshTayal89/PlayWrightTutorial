class LoginPage {
  constructor(page) {
    this.page = page;
    this.userName = page.locator("#userEmail");
    this.password = page.locator("#userPassword");
    this.loginbtn = page.locator("[value='Login']");
  }

  async goto() {
    await this.page.goto("https://rahulshettyacademy.com/client");
  }

  async validlogin(uname, pword) {
    await this.userName.fill(uname);
    await this.password.fill(pword);
    await this.loginbtn.click();
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = { LoginPage };