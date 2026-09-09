import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { EXPLORE_API_URL } from './app/explore-api-url.token';

// mock-api/browser (msw + los handlers + los datos de muestra) solo se descarga si alguien pide
// el modo mock explícitamente — el resto del tráfico real nunca paga ese peso.
async function enableMockingIfRequested(): Promise<void> {
  const params = new URLSearchParams(location.search);
  if (params.get('mock') !== '1') {
    return;
  }
  const { startMocking } = await import('mock-api/browser');
  await startMocking(params.get('mockError') === '1');
}

// runtime-config.json trae la URL real del backend por ambiente (ver DEPLOYMENT.md); en local
// apunta a localhost:8080, igual que el default de EXPLORE_API_URL, así que sobreescribirlo aquí
// no cambia nada en dev.
async function loadApiUrlProvider() {
  const config = await fetch('runtime-config.json').then((res) => res.json());
  return { provide: EXPLORE_API_URL, useValue: config.apiUrl };
}

Promise.all([enableMockingIfRequested(), loadApiUrlProvider()])
  .then(([, apiUrlProvider]) =>
    bootstrapApplication(AppComponent, {
      ...appConfig,
      providers: [...appConfig.providers, apiUrlProvider],
    })
  )
  .catch((err) => console.error(err));
