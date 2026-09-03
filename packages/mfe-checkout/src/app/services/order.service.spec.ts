import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ORDER_API_URL, OrderService } from './order.service';

describe('OrderService', () => {
  let service: OrderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ORDER_API_URL, useValue: 'http://api.test/api/orders' },
      ],
    });

    service = TestBed.inject(OrderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('posts a new order with credentials', () => {
    service.placeOrder({ firstName: 'Ada', lastName: 'Lovelace', storeId: 'aurora-flagship' })
      .subscribe();

    const req = httpMock.expectOne('http://api.test/api/orders');
    expect(req.request.method).toBe('POST');
    expect(req.request.withCredentials).toBe(true);
    req.flush({});
  });

  it('requests an order by id with credentials', () => {
    service.getOrder('order-1').subscribe();

    const req = httpMock.expectOne('http://api.test/api/orders/order-1');
    expect(req.request.method).toBe('GET');
    expect(req.request.withCredentials).toBe(true);
    req.flush({});
  });
});
