export class LoginPage {
  constructor(private page: any) {}
  async goto() { await this.page.goto('/'); }
  async login(username: string, password: string) {
    await this.page.fill('[data-test="username"]', username);
    await this.page.fill('[data-test="password"]', password);
    await this.page.click('[data-test="login-button"]');
  }
}
