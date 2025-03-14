import { test, expect } from '@playwright/test'

test.describe('The per-country page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/per-country')
    await expect(page.getByText('Overview of Variants in Countries')).toBeVisible({ timeout: 10_000 })
  })

  test('lists the correct countries after using country filters and switching regions', async ({ page }) => {
    const countriesMentions = await page.getByText('Countries').all()
    await countriesMentions[2].click()
    const africaButtons = await page.getByText('Africa').all()
    await africaButtons[0].click()
    const usaMentions = await page.getByText('United States').all()
    await usaMentions[0].click()
    const california = await page.getByText('California').all()
    await expect(california[1]).toBeVisible()
  })
})
