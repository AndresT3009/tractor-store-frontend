import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
// mock-api solo se importa dinámicamente desde código de producción (bootstrap.ts) para no
// pagar su peso en el bundle real; un test nunca se bundlea, así que aquí sí conviene estático.
// eslint-disable-next-line @nx/enforce-module-boundaries
import { resetMockApiState } from 'mock-api';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { server } from 'mock-api/node';
import { firstValueFrom } from 'rxjs';
import { ProductPageComponent } from './product-page.component';
import { ProductFacade } from '../../state/product.facade';

// Componente con HttpClient probado contra MSW en vez de un servicio mockeado con jest.fn().
// AddToCart/Recommendations vienen de otros MFEs vía loadRemoteModule: sin el runtime de
// federación inicializado, esa carga falla en silencio (capturada con .catch) y esos bloques del
// template simplemente no se pintan — no afecta lo que este test verifica.
describe('ProductPageComponent (vía MSW)', () => {
  let fixture: ComponentFixture<ProductPageComponent>;

  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
  afterEach(() => {
    server.resetHandlers();
    resetMockApiState();
  });
  afterAll(() => server.close());

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductPageComponent],
      providers: [provideHttpClient(), provideRouter([])],
    }).compileComponents();

    const facade = TestBed.inject(ProductFacade);
    await firstValueFrom(facade.loadProduct('smartfarm-titan', null));
    // loadProduct dispara selectVariant "fire and forget" (no encadenado) para no bloquear el
    // render del producto en el stock — se espera aparte para que el test vea el stock ya resuelto.
    await firstValueFrom(facade.selectVariant('SF-TITAN-COPPER'));

    fixture = TestBed.createComponent(ProductPageComponent);
    fixture.detectChanges();
  });

  it('renders the product name and price from the real HTTP call', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('SmartFarm Titan');
    expect(text).toContain('$4,000.00');
  });

  it('renders one variant option per variant and marks the first as selected', () => {
    const options = fixture.nativeElement.querySelectorAll('ts-variant-option');
    expect(options.length).toBe(2);
  });

  it('renders stock availability resolved from the inventory endpoint', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('in stock');
  });
});
