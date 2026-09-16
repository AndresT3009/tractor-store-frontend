import { http, HttpResponse } from 'msw';
import type { Order, PlaceOrderRequest } from 'shared-catalog';
import {
  createCartState,
  createOrder,
  mockCategory,
  mockHome,
  mockProducts,
  mockRecommendations,
  mockStock,
  mockStores,
} from './data';

const API_ROOT = 'http://localhost:8080/api';

let cartState = createCartState();
let orders = new Map<string, Order>();

// El token compartido API_URL (shared-catalog) apunta por defecto al mismo backend real
// (http://localhost:8080/api) — estos handlers cubren ese único contrato, no tres APIs separadas
// por equipo, porque así quedó construido el backend real.
export const handlers = [
  http.get(`${API_ROOT}/catalog/home`, () => HttpResponse.json(mockHome)),

  http.get(`${API_ROOT}/catalog/categories/:filter`, ({ params }) =>
    HttpResponse.json(mockCategory(String(params['filter'])))
  ),

  http.get(`${API_ROOT}/catalog/products/:id`, ({ params }) => {
    const product = mockProducts[String(params['id'])];
    return product
      ? HttpResponse.json(product)
      : HttpResponse.json({ title: 'Product not found', status: 404 }, { status: 404 });
  }),

  http.get(`${API_ROOT}/catalog/recommendations`, ({ request }) => {
    const skus = new URL(request.url).searchParams.get('skus')?.split(',') ?? [];
    return HttpResponse.json(mockRecommendations(skus));
  }),

  http.get(`${API_ROOT}/catalog/stores`, () => HttpResponse.json(mockStores)),

  http.get(`${API_ROOT}/inventory/:sku`, ({ params }) =>
    HttpResponse.json(mockStock(String(params['sku'])))
  ),

  http.get(`${API_ROOT}/cart`, () => HttpResponse.json(cartState.get())),

  http.get(`${API_ROOT}/cart/mini`, () => {
    const cart = cartState.get();
    return HttpResponse.json({ totalQuantity: cart.totalQuantity });
  }),

  http.post(`${API_ROOT}/cart/items`, async ({ request }) => {
    const body = (await request.json()) as { sku: string };
    return HttpResponse.json(cartState.addItem(body.sku), { status: 201 });
  }),

  http.delete(`${API_ROOT}/cart/items/:sku`, ({ params }) =>
    HttpResponse.json(cartState.removeItem(String(params['sku'])))
  ),

  http.post(`${API_ROOT}/orders`, async ({ request }) => {
    const cart = cartState.get();
    if (cart.items.length === 0) {
      return HttpResponse.json({ title: 'Cart is empty', status: 409 }, { status: 409 });
    }
    const body = (await request.json()) as PlaceOrderRequest;
    const order = createOrder({ ...body, cart });
    orders.set(order.id, order);
    cartState.clear();
    return HttpResponse.json(order, { status: 201 });
  }),

  http.get(`${API_ROOT}/orders/:id`, ({ params }) => {
    const order = orders.get(String(params['id']));
    return order
      ? HttpResponse.json(order)
      : HttpResponse.json({ title: 'Order not found', status: 404 }, { status: 404 });
  }),
];

// Reinicia el carrito y los pedidos en memoria: útil entre tests para no arrastrar estado de
// un caso al siguiente (los handlers en sí son los mismos que usa el modo dev sin backend).
export function resetMockApiState(): void {
  cartState = createCartState();
  orders = new Map();
}
