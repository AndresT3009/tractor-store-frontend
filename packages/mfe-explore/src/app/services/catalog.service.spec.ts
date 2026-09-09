import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { EXPLORE_API_URL } from '../explore-api-url.token';
import { CatalogService } from './catalog.service';

describe('CatalogService', () => {
  let service: CatalogService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: EXPLORE_API_URL, useValue: 'http://api.test/api' },
      ],
    });

    service = TestBed.inject(CatalogService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('requests the home teasers from /home', () => {
    service.getHome().subscribe();

    const req = httpMock.expectOne('http://api.test/api/catalog/home');
    expect(req.request.method).toBe('GET');
    req.flush({ categories: [] });
  });

  it('requests a category by filter', () => {
    service.getCategory('classic').subscribe();

    const req = httpMock.expectOne('http://api.test/api/catalog/categories/classic');
    expect(req.request.method).toBe('GET');
    req.flush({ products: [], availableFilters: [] });
  });

  it('requests the store list', () => {
    service.getStores().subscribe();

    const req = httpMock.expectOne('http://api.test/api/catalog/stores');
    expect(req.request.method).toBe('GET');
    req.flush([]);
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
