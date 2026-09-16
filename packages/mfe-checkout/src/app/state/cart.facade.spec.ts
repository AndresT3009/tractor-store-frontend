import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import type { Cart } from 'shared-catalog';
import { CartService } from '../services/cart.service';
import { CartFacade } from './cart.facade';

describe('CartFacade', () => {
  let facade: CartFacade;
  let cartService: jest.Mocked<CartService>;

  const cart: Cart = {
    items: [
      {
        sku: 'SF-TITAN-COPPER',
        productId: 'smartfarm-titan',
        productName: 'SmartFarm Titan',
        unitPrice: 4000,
        quantity: 2,
        subtotal: 8000,
        imageUrl: '',
      },
    ],
    totalQuantity: 2,
    totalPrice: 8000,
  };

  beforeEach(() => {
    cartService = {
      getCart: jest.fn().mockReturnValue(of(cart)),
      addItem: jest.fn().mockReturnValue(of(cart)),
      removeItem: jest.fn().mockReturnValue(of({ items: [], totalQuantity: 0, totalPrice: 0 })),
    } as unknown as jest.Mocked<CartService>;

    TestBed.configureTestingModule({
      providers: [{ provide: CartService, useValue: cartService }],
    });

    facade = TestBed.inject(CartFacade);
  });

  it('exposes zeroed totals before the cart loads', () => {
    expect(facade.totalItems()).toBe(0);
    expect(facade.totalPrice()).toBe(0);
  });

  it('derives totalItems and totalPrice from the loaded cart', () => {
    facade.loadCart().subscribe();

    expect(facade.totalItems()).toBe(2);
    expect(facade.totalPrice()).toBe(8000);
    expect(facade.items()).toEqual(cart.items);
  });

  it('updates the store after addItem', () => {
    facade.addItem('SF-TITAN-COPPER').subscribe();

    expect(facade.totalItems()).toBe(2);
  });

  it('updates the store after removeItem', () => {
    facade.loadCart().subscribe();
    facade.removeItem('SF-TITAN-COPPER').subscribe();

    expect(facade.totalItems()).toBe(0);
  });
});
