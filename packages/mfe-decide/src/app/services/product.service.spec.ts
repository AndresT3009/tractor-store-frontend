import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { DECIDE_API_URL } from '../decide-api-url.token';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: DECIDE_API_URL, useValue: 'http://api.test/api' },
      ],
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('requests a product by id', () => {
    service.getProduct('smartfarm-titan').subscribe();

    const req = httpMock.expectOne('http://api.test/api/catalog/products/smartfarm-titan');
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});
