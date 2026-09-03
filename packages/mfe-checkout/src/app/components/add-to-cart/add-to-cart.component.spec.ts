import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import type { Cart } from 'shared-catalog';
import { CartService } from '../../services/cart.service';
import { AddToCartComponent } from './add-to-cart.component';

describe('AddToCartComponent', () => {
  let fixture: ComponentFixture<AddToCartComponent>;
  let cartService: jest.Mocked<CartService>;

  const cart: Cart = { items: [], totalQuantity: 1, totalPrice: 4000 };

  beforeEach(async () => {
    cartService = {
      addItem: jest.fn().mockReturnValue(of(cart)),
    } as unknown as jest.Mocked<CartService>;

    await TestBed.configureTestingModule({
      imports: [AddToCartComponent],
      providers: [{ provide: CartService, useValue: cartService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AddToCartComponent);
    fixture.componentInstance.sku = 'SF-TITAN-COPPER';
    fixture.detectChanges();
  });

  it('should create with a valid pre-filled form', () => {
    expect(fixture.componentInstance.form.valid).toBe(true);
  });

  it('calls CartService.addItem with the sku on submit', () => {
    fixture.componentInstance.submit();

    expect(cartService.addItem).toHaveBeenCalledWith('SF-TITAN-COPPER');
  });
});
