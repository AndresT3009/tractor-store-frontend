import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { resetMockApiState } from 'mock-api';
import { server } from 'mock-api/node';
import { CartActions } from './cart.actions';
import { CartStore } from './cart.store';

// A diferencia de cart.facade.spec.ts (que mockea CartService con jest.fn()), este test ejercita
// CartStore a través de un HttpClient real interceptado por MSW a nivel de red — los mismos
// handlers que se usan en modo dev sin backend (mock-api/browser).
describe('CartStore (vía MSW)', () => {
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

  it('starts empty', () => {
    const store = TestBed.inject(CartStore);
    expect(store.snapshot().cart).toBeNull();
  });

  it('reflects a real add-to-cart response from the mocked network', async () => {
    const actions = TestBed.inject(CartActions);
    const store = TestBed.inject(CartStore);

    await new Promise<void>((resolve) => actions.addItem('SF-TITAN-COPPER').subscribe(() => resolve()));

    const cart = store.snapshot().cart;
    expect(cart?.totalQuantity).toBe(1);
    expect(cart?.items[0].sku).toBe('SF-TITAN-COPPER');
  });

  it('accumulates quantity across two adds of the same sku', async () => {
    const actions = TestBed.inject(CartActions);
    const store = TestBed.inject(CartStore);

    await new Promise<void>((resolve) => actions.addItem('SF-TITAN-COPPER').subscribe(() => resolve()));
    await new Promise<void>((resolve) => actions.addItem('SF-TITAN-COPPER').subscribe(() => resolve()));

    expect(store.snapshot().cart?.totalQuantity).toBe(2);
  });
});
