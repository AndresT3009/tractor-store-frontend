import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { CART_API_URL, CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: CART_API_URL, useValue: 'http://api.test/api/cart' },
      ],
    });

    service = TestBed.inject(CartService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('requests the cart with credentials', () => {
    service.getCart().subscribe();

    const req = httpMock.expectOne('http://api.test/api/cart');
    expect(req.request.method).toBe('GET');
    expect(req.request.withCredentials).toBe(true);
    req.flush({ items: [], totalQuantity: 0, totalPrice: 0 });
  });

  it('requests the mini cart with credentials', () => {
    service.getMiniCart().subscribe();

    const req = httpMock.expectOne('http://api.test/api/cart/mini');
    expect(req.request.withCredentials).toBe(true);
    req.flush({ totalQuantity: 0 });
  });

  it('posts an item to add to the cart', () => {
    service.addItem('SF-TITAN-COPPER').subscribe();

    const req = httpMock.expectOne('http://api.test/api/cart/items');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ sku: 'SF-TITAN-COPPER' });
    expect(req.request.withCredentials).toBe(true);
    req.flush({ items: [], totalQuantity: 1, totalPrice: 0 });
  });

  it('deletes an item from the cart', () => {
    service.removeItem('SF-TITAN-COPPER').subscribe();

    const req = httpMock.expectOne('http://api.test/api/cart/items/SF-TITAN-COPPER');
    expect(req.request.method).toBe('DELETE');
    expect(req.request.withCredentials).toBe(true);
    req.flush({ items: [], totalQuantity: 0, totalPrice: 0 });
  });
});
