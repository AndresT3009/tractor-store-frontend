import { expect, test } from '@playwright/test';

// Todo el flujo corre contra MSW (?mock=1), no contra el backend real — los mismos handlers de
// mock-api sirven para desarrollar sin backend y para este test.
test('home → categoría → producto → variante → carrito → checkout → thanks, sin backend real', async ({
  page,
}) => {
  await page.goto('/?mock=1');

  await page.getByRole('link', { name: 'Autonomous Tractors' }).click();
  await expect(page).toHaveURL(/\/category\/autonomous/);

  await page.getByRole('button', { name: 'SmartFarm Titan' }).click();
  await expect(page).toHaveURL(/\/product\/smartfarm-titan/);
  await expect(page.getByRole('heading', { name: 'SmartFarm Titan' })).toBeVisible();

  const variantOptions = page.locator('ts-variant-option');
  await expect(variantOptions).toHaveCount(2);
  await variantOptions.nth(1).click();
  await expect(page).toHaveURL(/sku=SF-TITAN-SAPPHIRE/);

  const addToCartButton = page.locator('form ts-button').first();
  await expect(addToCartButton).toBeVisible();
  await addToCartButton.click();

  const miniCart = page.getByTestId('mini-cart');
  await expect(miniCart).toContainText('1 items');

  await miniCart.click();
  await expect(page).toHaveURL(/\/cart/);
  await expect(page.getByText('SmartFarm Titan')).toBeVisible();

  await page.getByRole('button', { name: 'Checkout' }).click();
  await expect(page).toHaveURL(/\/checkout/);

  await page.getByLabel('First name').fill('Ada');
  await page.getByLabel('Last name').fill('Lovelace');

  const storeSelect = page.locator('select');
  await expect(storeSelect).toBeVisible();
  await storeSelect.selectOption({ label: 'Denver Yard — Denver' });

  await page.getByRole('button', { name: 'Place order' }).click();

  await expect(page).toHaveURL(/\/thanks\//);
  await expect(page.getByRole('heading', { name: /Thanks for your order, Ada/ })).toBeVisible();
});

test('shows the cross-MFE error banner when the backend responds with a 500', async ({ page }) => {
  await page.goto('/?mock=1&mockError=1');

  const banner = page.getByTestId('http-error-banner');
  await expect(banner).toBeVisible();
  await expect(banner).toContainText('500');

  await banner.getByRole('button', { name: 'Dismiss' }).click();
  await expect(banner).not.toBeVisible();
});
