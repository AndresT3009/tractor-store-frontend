import { http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

// ?mock=1&mockError=1 fuerza que la primera llamada real (home) falle con 500, para probar el
// camino de error del interceptor sin depender de que el backend esté caído.
export async function startMocking(mockError: boolean): Promise<void> {
  if (mockError) {
    worker.use(
      http.get('http://localhost:8080/api/catalog/home', () =>
        HttpResponse.json({ title: 'Internal Server Error', status: 500 }, { status: 500 })
      )
    );
  }

  await worker.start({ onUnhandledRequest: 'bypass' });
}
