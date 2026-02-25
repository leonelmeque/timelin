import { test, expect, Page } from '@playwright/test';

async function login(page: Page) {
  await page.goto('/');
  await page.waitForURL('**/sign-in', { timeout: 10000 }).catch(() => {});
  await page.getByPlaceholder("john.doe").fill('test@example.com');
  await page.getByPlaceholder("**********").fill('password123');
  await page.getByText('Login', { exact: true }).click();
  await expect(page.getByText('Projects', { exact: true })).toBeVisible({ timeout: 15000 });
}

test.describe('Authentication', () => {
  test('should show sign-in page on load', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Username')).toBeVisible();
    await expect(page.getByText('Password')).toBeVisible();
    await expect(page.getByText('Login', { exact: true })).toBeVisible();
  });

  test('should login and show home with seeded data', async ({ page }) => {
    await login(page);
    await expect(page.getByText(/Build authentication/).first()).toBeVisible({ timeout: 5000 });
    await expect(page.getByText(/Design landing/).first()).toBeVisible();
  });
});

test.describe('Todo Detail & Pomodoro', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('should show pomodoro timer on todo detail', async ({ page }) => {
    await page.getByText(/Build authentication/).first().click();
    await expect(page.getByText('READY TO FOCUS')).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('25:00')).toBeVisible();
  });

  test('should show timeline events', async ({ page }) => {
    await page.getByText(/Build authentication/).first().click();
    await expect(page.getByText('Started research')).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('Setup Supabase project')).toBeVisible();
  });
});

test.describe('Retrospective', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('should show retro stats for a todo', async ({ page }) => {
    await page.getByText(/Build authentication/).first().click();
    await expect(page.getByText('READY TO FOCUS')).toBeVisible({ timeout: 5000 });

    await page.getByText('Retrospective', { exact: true }).click();

    await expect(page.getByText('Pomodoros', { exact: true })).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('Focus Time', { exact: true })).toBeVisible();
    await expect(page.getByText('Break Time', { exact: true })).toBeVisible();
    await expect(page.getByText('Updates', { exact: true })).toBeVisible();
  });

  test('should switch retro periods', async ({ page }) => {
    await page.getByText(/Build authentication/).first().click();
    await expect(page.getByText('READY TO FOCUS')).toBeVisible({ timeout: 5000 });
    await page.getByText('Retrospective', { exact: true }).click();
    await expect(page.getByText('Pomodoros', { exact: true })).toBeVisible({ timeout: 5000 });

    await page.getByText('Day', { exact: true }).click();
    await expect(page.getByText('Daily Retrospective')).toBeVisible({ timeout: 5000 });

    await page.getByText('Week', { exact: true }).click();
    await expect(page.getByText('Weekly Retrospective')).toBeVisible({ timeout: 5000 });
  });
});

test.describe('Seeded Data', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('should show pinned section', async ({ page }) => {
    await expect(page.getByText('Pinned', { exact: true })).toBeVisible();
  });

  test('should show latest section', async ({ page }) => {
    await expect(page.getByText('Latest', { exact: true })).toBeVisible();
  });
});
