import { ComponentFixture, TestBed } from '@angular/core/testing';
import type { ProductSummary } from 'shared-catalog';
import { TsProductCardComponent } from './ts-product-card.component';

describe('TsProductCardComponent', () => {
  let fixture: ComponentFixture<TsProductCardComponent>;

  const product: ProductSummary = {
    id: 'smartfarm-titan',
    name: 'SmartFarm Titan',
    price: 4000,
    imageUrl: '/images/smartfarm-titan-copper.png',
    category: 'autonomous',
  };

  function queryCard(): HTMLButtonElement {
    const card = (fixture.nativeElement as HTMLElement).shadowRoot?.querySelector('button');
    if (!card) {
      throw new Error('Expected <button> inside the shadow root');
    }
    return card as HTMLButtonElement;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TsProductCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TsProductCardComponent);
    fixture.componentInstance.product = product;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the product name', () => {
    const name = fixture.nativeElement.shadowRoot.querySelector('.ts-product-card__name');
    expect(name.textContent).toContain('SmartFarm Titan');
  });

  it('should hide the price when showPrice is false', () => {
    fixture.componentInstance.showPrice = false;
    fixture.detectChanges();

    const price = fixture.nativeElement.shadowRoot.querySelector('.ts-product-card__price');
    expect(price).toBeNull();
  });

  it('should emit chosen with the product id when clicked', () => {
    const chosen = jest.fn();
    fixture.componentInstance.chosen.subscribe(chosen);

    queryCard().click();

    expect(chosen).toHaveBeenCalledWith('smartfarm-titan');
  });
});
