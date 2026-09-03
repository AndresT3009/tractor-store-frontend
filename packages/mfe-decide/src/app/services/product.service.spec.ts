import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { CATALOG_API_URL, ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: CATALOG_API_URL, useValue: 'http://api.test/api/catalog' },
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

  it('requests recommendations for a csv of skus', () => {
    service.getRecommendations(['SF-TITAN-COPPER', 'RAPID-BLUE']).subscribe();

    const req = httpMock.expectOne(
      'http://api.test/api/catalog/recommendations?skus=SF-TITAN-COPPER,RAPID-BLUE'
    );
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });
});
