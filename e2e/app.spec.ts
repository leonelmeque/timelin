import { test, expect, Page } from '@playwright/test';

async function login(page: Page) {
  await page.goto('/');
  await page.waitForURL('**/sign-in', { timeout: 10000 }).catch(() => {});
  await page.getByPlaceholder("you@example.com").fill('test@example.com');
  await page.getByPlaceholder("Enter your password").fill('password123');
  await page.getByText('Sign in', { exact: true }).click();
  await expect(page.getByText('Tasks', { exact: true }).first()).toBeVisible({ timeout: 15000 });
}

async function openTask(page: Page, taskPattern: RegExp) {
  await page.getByText(taskPattern).first().click();
  await page.getByText('Open task').click();
  await expect(page.getByText('Pomodoro Timer')).toBeVisible({ timeout: 5000 });
}

test.describe('Authentication', () => {
  test('should show sign-in page on load', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Timelin')).toBeVisible({ timeout: 10000 });
    await expect(page.getByPlaceholder('you@example.com')).toBeVisible();
  });

  test('should login and show home with tasks', async ({ page }) => {
    await login(page);
    await expect(page.getByText(/Build authentication/).first()).toBeVisible({ timeout: 5000 });
  });
});

test.describe('Task Management', () => {
  test.beforeEach(async ({ page }) => { await login(page); });

  test('should expand card and open task detail', async ({ page }) => {
    await openTask(page, /Build authentication/);
    await expect(page.getByText('Start', { exact: true })).toBeVisible();
  });

  test('should show timeline events on task', async ({ page }) => {
    await openTask(page, /Build authentication/);
    await expect(page.getByText('Started research')).toBeVisible({ timeout: 5000 });
  });
});

test.describe('Retrospective', () => {
  test.beforeEach(async ({ page }) => { await login(page); });

  test('should show retro stats for a task', async ({ page }) => {
    await openTask(page, /Build authentication/);
    await page.getByText('Retrospective', { exact: true }).click();
    await expect(page.getByText('Pomodoros', { exact: true })).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('Focus Time', { exact: true })).toBeVisible();
  });

  test('should switch retro periods', async ({ page }) => {
    await openTask(page, /Build authentication/);
    await page.getByText('Retrospective', { exact: true }).click();
    await expect(page.getByText('Pomodoros', { exact: true })).toBeVisible({ timeout: 5000 });
    await page.getByText('Week', { exact: true }).click();
    await expect(page.getByText('Weekly Retrospective')).toBeVisible({ timeout: 5000 });
  });
});

test.describe('Logout', () => {
  test('should logout and redirect to sign-in', async ({ page }) => {
    await login(page);
    await page.getByText('Settings').click();
    await expect(page.getByText('Log out')).toBeVisible({ timeout: 5000 });
    await page.getByText('Log out').click();
    await expect(page.getByPlaceholder('you@example.com')).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Responsive Layout', () => {
  test('should show sidebar on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await login(page);
    await expect(page.getByText('Task Management')).toBeVisible();
  });
});
