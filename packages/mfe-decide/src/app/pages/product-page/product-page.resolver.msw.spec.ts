import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { convertToParamMap, type ActivatedRouteSnapshot } from '@angular/router';
// mock-api solo se importa dinámicamente desde código de producción (bootstrap.ts) para no
// pagar su peso en el bundle real; un test nunca se bundlea, así que aquí sí conviene estático.
// eslint-disable-next-line @nx/enforce-module-boundaries
import { resetMockApiState } from 'mock-api';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { server } from 'mock-api/node';
import { firstValueFrom } from 'rxjs';
import { productResolver } from './product-page.resolver';

// Mismo backend simulado (mock-api) que usan cart.store.msw.spec.ts y
// product-page.component.msw.spec.ts, en vez de mockear el HttpClient a mano.
describe('productResolver (vía MSW)', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
  afterEach(() => {
    server.resetHandlers();
    resetMockApiState();
  });
  afterAll(() => server.close());

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
  });

  function snapshotFor(id: string, sku?: string): ActivatedRouteSnapshot {
    return {
      paramMap: convertToParamMap({ id }),
      queryParams: sku ? { sku } : {},
    } as unknown as ActivatedRouteSnapshot;
  }

  it('resolves the product by id from the route param', async () => {
    const result = await TestBed.runInInjectionContext(() =>
      firstValueFrom(productResolver(snapshotFor('smartfarm-titan'), {} as never) as never)
    );

    expect((result as { id: string }).id).toBe('smartfarm-titan');
  });

  it('propagates a 404 for an unknown product id', async () => {
    await expect(
      TestBed.runInInjectionContext(() =>
        firstValueFrom(productResolver(snapshotFor('does-not-exist'), {} as never) as never)
      )
    ).rejects.toBeTruthy();
  });
});
