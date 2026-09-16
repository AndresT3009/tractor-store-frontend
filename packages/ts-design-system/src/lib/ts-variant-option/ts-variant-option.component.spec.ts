import { ComponentFixture, TestBed } from '@angular/core/testing';
import type { Variant } from 'shared-catalog';
import { TsVariantOptionComponent } from './ts-variant-option.component';

describe('TsVariantOptionComponent', () => {
  let fixture: ComponentFixture<TsVariantOptionComponent>;

  const variant: Variant = {
    sku: 'SF-TITAN-COPPER',
    colorName: 'Sunset Copper',
    colorHex: '#C24914',
    imageUrl: '/images/smartfarm-titan-copper.png',
  };

  function queryOption(): HTMLButtonElement {
    const option = (fixture.nativeElement as HTMLElement).shadowRoot?.querySelector('button');
    if (!option) {
      throw new Error('Expected <button> inside the shadow root');
    }
    return option as HTMLButtonElement;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TsVariantOptionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TsVariantOptionComponent);
    fixture.componentInstance.variant = variant;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should not have the selected modifier by default', () => {
    expect(queryOption().classList.contains('ts-variant-option--selected')).toBe(false);
  });

  it('should apply the selected modifier when selected is true', () => {
    fixture.componentInstance.selected = true;
    fixture.detectChanges();

    expect(queryOption().classList.contains('ts-variant-option--selected')).toBe(true);
  });

  it('should emit chosen with the variant sku when clicked', () => {
    const chosen = jest.fn();
    fixture.componentInstance.chosen.subscribe(chosen);

    queryOption().click();

    expect(chosen).toHaveBeenCalledWith('SF-TITAN-COPPER');
  });
});
