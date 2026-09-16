import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import type { Cart } from 'shared-catalog';
import { CART_ITEM_ADDED_EVENT } from 'shared-catalog';
import { CartService } from '../../services/cart.service';
import { MiniCartComponent } from './mini-cart.component';

describe('MiniCartComponent', () => {
  let fixture: ComponentFixture<MiniCartComponent>;
  let cartService: jest.Mocked<CartService>;

  const cart: Cart = { items: [], totalQuantity: 2, totalPrice: 8000 };

  beforeEach(async () => {
    cartService = {
      getCart: jest.fn().mockReturnValue(of(cart)),
    } as unknown as jest.Mocked<CartService>;

    await TestBed.configureTestingModule({
      imports: [MiniCartComponent],
      providers: [provideRouter([]), { provide: CartService, useValue: cartService }],
    }).compileComponents();

    fixture = TestBed.createComponent(MiniCartComponent);
    fixture.detectChanges();
  });

  it('loads the cart on init', () => {
    expect(cartService.getCart).toHaveBeenCalledTimes(1);
    expect(fixture.componentInstance['cart'].totalItems()).toBe(2);
  });

  it('reloads the cart when it receives the cross-MFE add event', () => {
    window.dispatchEvent(
      new CustomEvent(CART_ITEM_ADDED_EVENT, { detail: { sku: 'x', totalItems: 3 } })
    );

    expect(cartService.getCart).toHaveBeenCalledTimes(2);
  });
});
