import { test, expect } from '@playwright/test';

test('renders the shell header', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('header')).toContainText('shell');
});

test.describe('design tokens cross the Shadow DOM boundary', () => {
  test('ts-button (Custom Element, ViewEncapsulation.ShadowDom) reacts to --color-primary', async ({
    page,
  }) => {
    await page.goto('/');
    const cartButton = page.locator('ts-button[data-testid="cart-button"]');
    await expect(cartButton).toBeVisible();

    const readBackgroundColor = () =>
      cartButton.evaluate((host) => {
        const button = host.shadowRoot?.querySelector('button');
        if (!button) throw new Error('Expected <button> inside the shadow root');
        return getComputedStyle(button).backgroundColor;
      });

    const initialColor = await readBackgroundColor();

    // Un selector CSS normal del documento no llegaría a tocar el <button> real (está dentro del
    // shadow root); solo una CSS Custom Property, heredada por el árbol, cruza esa frontera.
    await page.evaluate(() => {
      document.documentElement.style.setProperty('--color-primary', 'rgb(17, 17, 238)');
    });

    await expect.poll(readBackgroundColor).not.toBe(initialColor);
    await expect.poll(readBackgroundColor).toBe('rgb(17, 17, 238)');
  });

  test('ts-button dispatches its @Output as a vanilla CustomEvent', async ({ page }) => {
    await page.goto('/');
    const cartButton = page.locator('ts-button[data-testid="cart-button"]');
    await expect(cartButton).toBeVisible();

    await cartButton.evaluate((host) => {
      host.addEventListener('press', () => {
        (window as unknown as { __pressCount: number }).__pressCount =
          ((window as unknown as { __pressCount?: number }).__pressCount ?? 0) + 1;
      });
    });

    await cartButton.locator('button').click();

    await expect
      .poll(() => page.evaluate(() => (window as unknown as { __pressCount?: number }).__pressCount))
      .toBe(1);
  });
});
