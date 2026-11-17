import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = ['/', '/privacy.html', '/terms.html', '/refund.html', '/disclaimer.html', '/eula.html', '/licenses.html', '/cookies.html', '/accessibility.html', '/faq.html', '/support.html', '/delete-account.html', '/get.html?choose=1', '/404.html'];

test('every public route reflows on a narrow phone', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 780 });
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    const width = await page.evaluate(() => ({ screen: innerWidth, page: document.documentElement.scrollWidth }));
    expect(width.page, route).toBeLessThanOrEqual(width.screen);
  }
});

for (const width of [390, 768, 1440]) {
  test(`homepage layout at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    const failures: string[] = [];
    page.on('response', (response) => { if (response.status() >= 400) failures.push(`${response.status()} ${response.url()}`); });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('h1')).toHaveText('Your Vedic birth chart,made clear.');
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    expect(errors).toEqual([]);
    expect(failures).toEqual([]);
    await page.screenshot({ path: test.info().outputPath(`home-${width}.png`), fullPage: true });
  });
}

test('mobile menu opens, navigates, and closes with Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const menu = page.locator('.mobile-menu');
  await menu.locator('summary').click();
  await expect(menu).toHaveAttribute('open', '');
  await menu.getByRole('link', { name: 'Plans' }).click();
  await expect(page).toHaveURL(/#plans$/);
  await expect(menu).not.toHaveAttribute('open');
  await menu.locator('summary').click();
  await page.keyboard.press('Escape');
  await expect(menu).not.toHaveAttribute('open');
  await expect(menu.locator('summary')).toBeFocused();
});

test('product tour supports clicks and arrow keys', async ({ page }) => {
  await page.goto('/');
  const timing = page.getByRole('tab', { name: 'Timing', exact: true });
  await timing.click();
  await expect(timing).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel')).toHaveCount(1);
  await expect(page.getByRole('tabpanel')).toContainText('The day’s timing, wherever you are.');
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'Compatibility' })).toBeFocused();
  await expect(page.getByRole('tabpanel')).toContainText('More to a match than a number.');
  await page.keyboard.press('Home');
  await expect(page.getByRole('tab', { name: 'Birth chart' })).toBeFocused();
});

test('core content and store choices work without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4322/');
  await expect(page.locator('.tour-panel')).toHaveCount(4);
  for (const panel of await page.locator('.tour-panel').all()) await expect(panel).toBeVisible();
  await page.goto('http://127.0.0.1:4322/get.html');
  await expect(page.locator('[data-store="ios"]')).toBeVisible();
  await expect(page.locator('[data-store="android"]')).toBeVisible();
  await page.goto('http://127.0.0.1:4322/faq.html');
  const explanation = page.locator('#help-dashas');
  await explanation.locator('summary').click();
  await expect(explanation.locator('[data-concept-details]')).toBeVisible();
  await context.close();
});

test('beginner overview links open the corresponding detailed explanation', async ({ page }) => {
  await page.goto('/');
  const overview = page.locator('#question-vedic-signs');
  await overview.locator('summary').click();
  await expect(overview.locator('[data-concept-details]')).toHaveCount(0);
  await overview.locator('.concept-link').click();
  await expect(page).toHaveURL(/\/faq\.html#help-vedic-signs$/);
  const explanation = page.locator('#help-vedic-signs');
  await expect(explanation).toHaveAttribute('open', '');
  await expect(explanation.locator('[data-concept-details]')).toBeVisible();
});

test('direct links reveal a detailed concept on a narrow phone', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 780 });
  await page.goto('/faq.html#help-dashas');
  const explanation = page.locator('#help-dashas');
  await expect(explanation).toHaveAttribute('open', '');
  await expect(explanation.locator('[data-concept-details]')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
});

for (const [name, userAgent, target] of [
  ['iPhone', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148', 'https://apps.apple.com/app/astrodyuti/id6772030551'],
  ['Android', 'Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36 Chrome/130.0.0.0 Mobile Safari/537.36', 'https://play.google.com/store/apps/details?id=com.jyotishvani.app'],
]) {
  test(`download route sends ${name} to the right store`, async ({ browser }) => {
    const context = await browser.newContext({ userAgent });
    const page = await context.newPage();
    await page.route(target, (route) => route.fulfill({ status: 200, contentType: 'text/html', body: '<h1>Store destination</h1>' }));
    await page.goto('http://127.0.0.1:4322/get.html');
    await expect(page).toHaveURL(target);
    await context.close();
  });
}

for (const route of ['/', '/faq.html', '/support.html', '/privacy.html', '/delete-account.html']) {
  test(`accessibility check: ${route}`, async ({ page }) => {
    await page.goto(route);
    if (route === '/faq.html') {
      await page.locator('.faq-list details').evaluateAll((questions) => questions.forEach((question) => { (question as HTMLDetailsElement).open = true; }));
    }
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(result.violations.map(({ id, nodes }) => ({ id, targets: nodes.map((node) => node.target) }))).toEqual([]);
  });
}
