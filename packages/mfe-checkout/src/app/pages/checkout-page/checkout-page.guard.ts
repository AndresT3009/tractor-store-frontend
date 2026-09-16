import type { CanDeactivateFn } from '@angular/router';
import type { CheckoutPageComponent } from './checkout-page.component';

export const unsavedChangesGuard: CanDeactivateFn<CheckoutPageComponent> = (component) => {
  if (component.submitted || component.form.pristine) {
    return true;
  }
  return window.confirm('You have unsaved changes. Leave the checkout page anyway?');
};
