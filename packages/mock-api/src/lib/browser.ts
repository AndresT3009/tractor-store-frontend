import { http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

// Activación por query param (?mock=1), no por defecto: el resto del proyecto se desarrolla y
// verifica contra el backend real; esto es solo para poder trabajar o testear sin él cuando
// hace falta. ?mock=1&mockError=1 además fuerza que la primera llamada real (home) falle con
// 500, para probar el camino de error del interceptor sin depender de que el backend esté caído.
export async function enableMockingIfRequested(): Promise<void> {
  if (typeof location === 'undefined') {
    return;
  }

  const params = new URLSearchParams(location.search);
  if (params.get('mock') !== '1') {
    return;
  }

  if (params.get('mockError') === '1') {
    worker.use(
      http.get('http://localhost:8080/api/catalog/home', () =>
        HttpResponse.json({ title: 'Internal Server Error', status: 500 }, { status: 500 })
      )
    );
  }

  await worker.start({ onUnhandledRequest: 'bypass' });
}
