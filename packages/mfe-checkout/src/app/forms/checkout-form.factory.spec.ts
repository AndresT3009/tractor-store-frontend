import { TestBed } from '@angular/core/testing';
import { CheckoutFormFactory } from './checkout-form.factory';

describe('CheckoutFormFactory', () => {
  let factory: CheckoutFormFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    factory = TestBed.inject(CheckoutFormFactory);
  });

  it('creates an invalid form when required fields are empty', () => {
    const form = factory.create();

    expect(form.valid).toBe(false);
  });

  it('creates a valid form once all required fields are filled', () => {
    const form = factory.create();

    form.setValue({ firstName: 'Ada', lastName: 'Lovelace', storeId: 'aurora-flagship' });

    expect(form.valid).toBe(true);
  });
});
