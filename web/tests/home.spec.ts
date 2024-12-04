import { test, expect } from '@playwright/test'

test.describe('The Home page', () => {
test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('has title', async ({ page }) => {
  await expect(page).toHaveTitle(/CoVariants/)
})

test('navbar link', async ({ page }) => {
  await page.getByRole('link', { name: 'FAQ' }).click()

  await expect(page.getByRole('heading', { name: 'Frequently asked questions' })).toBeVisible()
})
});
