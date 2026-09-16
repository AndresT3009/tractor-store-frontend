import { TestBed } from '@angular/core/testing';
import { AddToCartFormFactory } from './add-to-cart-form.factory';

describe('AddToCartFormFactory', () => {
  let factory: AddToCartFormFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    factory = TestBed.inject(AddToCartFormFactory);
  });

  it('pre-fills and validates the given sku', () => {
    const form = factory.create('SF-TITAN-COPPER');

    expect(form.valid).toBe(true);
    expect(form.getRawValue()).toEqual({ sku: 'SF-TITAN-COPPER' });
  });

  it('is invalid when the sku is cleared', () => {
    const form = factory.create('SF-TITAN-COPPER');

    form.controls.sku.setValue('');

    expect(form.valid).toBe(false);
  });
});
