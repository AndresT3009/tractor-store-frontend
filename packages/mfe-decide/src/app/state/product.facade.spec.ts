import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import type { ProductDetail, Recommendation, Stock } from 'shared-catalog';
import { InventoryService } from '../services/inventory.service';
import { ProductService } from '../services/product.service';
import { ProductFacade } from './product.facade';

describe('ProductFacade', () => {
  let facade: ProductFacade;
  let productService: jest.Mocked<ProductService>;
  let inventoryService: jest.Mocked<InventoryService>;

  const product: ProductDetail = {
    id: 'smartfarm-titan',
    name: 'SmartFarm Titan',
    description: '',
    category: 'autonomous',
    price: 4000,
    highlights: [],
    variants: [
      { sku: 'SF-TITAN-COPPER', colorName: 'Sunset Copper', colorHex: '#C24914', imageUrl: '' },
      { sku: 'SF-TITAN-SAPPHIRE', colorName: 'Cosmic Sapphire', colorHex: '#1B3F91', imageUrl: '' },
    ],
  };
  const stock: Stock = { sku: 'SF-TITAN-COPPER', quantityAvailable: 6, available: true };
  const recommendations: Recommendation[] = [];

  beforeEach(() => {
    productService = {
      getProduct: jest.fn().mockReturnValue(of(product)),
      getRecommendations: jest.fn().mockReturnValue(of(recommendations)),
    } as unknown as jest.Mocked<ProductService>;
    inventoryService = {
      getStock: jest.fn().mockReturnValue(of(stock)),
    } as unknown as jest.Mocked<InventoryService>;

    TestBed.configureTestingModule({
      providers: [
        { provide: ProductService, useValue: productService },
        { provide: InventoryService, useValue: inventoryService },
      ],
    });

    facade = TestBed.inject(ProductFacade);
  });

  it('selects the first variant when no valid sku is given', () => {
    facade.loadProduct('smartfarm-titan', null).subscribe();

    expect(facade.selectedSku()).toBe('SF-TITAN-COPPER');
    expect(inventoryService.getStock).toHaveBeenCalledWith('SF-TITAN-COPPER');
  });

  it('honors a valid sku from the URL', () => {
    facade.loadProduct('smartfarm-titan', 'SF-TITAN-SAPPHIRE').subscribe();

    expect(facade.selectedSku()).toBe('SF-TITAN-SAPPHIRE');
    expect(inventoryService.getStock).toHaveBeenCalledWith('SF-TITAN-SAPPHIRE');
  });

  it('falls back to the first variant when the URL sku does not belong to the product', () => {
    facade.loadProduct('smartfarm-titan', 'DOES-NOT-EXIST').subscribe();

    expect(facade.selectedSku()).toBe('SF-TITAN-COPPER');
  });

  it('updates stock and recommendations when selecting a variant', () => {
    facade.selectVariant('SF-TITAN-COPPER').subscribe();

    expect(facade.stock()).toEqual(stock);
    expect(facade.recommendations()).toEqual(recommendations);
  });
});
