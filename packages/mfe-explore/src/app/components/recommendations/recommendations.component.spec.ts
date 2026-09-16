import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import type { Recommendation } from 'shared-catalog';
import { CatalogService } from '../../services/catalog.service';
import { RecommendationsComponent } from './recommendations.component';

describe('RecommendationsComponent', () => {
  let fixture: ComponentFixture<RecommendationsComponent>;
  let catalogService: jest.Mocked<CatalogService>;

  const recommendations: Recommendation[] = [
    {
      sku: 'RAPID-BLUE',
      productId: 'rapid-plow',
      productName: 'Rapid Plow',
      price: 1200,
      imageUrl: '',
    },
  ];

  beforeEach(async () => {
    catalogService = {
      getRecommendations: jest.fn().mockReturnValue(of(recommendations)),
    } as unknown as jest.Mocked<CatalogService>;

    await TestBed.configureTestingModule({
      imports: [RecommendationsComponent],
      providers: [{ provide: CatalogService, useValue: catalogService }],
    }).compileComponents();

    fixture = TestBed.createComponent(RecommendationsComponent);
    fixture.componentRef.setInput('sku', 'SF-TITAN-COPPER');
    fixture.detectChanges();
  });

  it('fetches recommendations for the given sku', () => {
    expect(catalogService.getRecommendations).toHaveBeenCalledWith(['SF-TITAN-COPPER']);
    expect(fixture.componentInstance.recommendations).toEqual(recommendations);
  });

  it('refetches when the sku input changes', () => {
    fixture.componentRef.setInput('sku', 'RAPID-BLUE');
    fixture.detectChanges();

    expect(catalogService.getRecommendations).toHaveBeenCalledWith(['RAPID-BLUE']);
  });
});
