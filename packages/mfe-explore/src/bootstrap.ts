import { bootstrapApplication } from '@angular/platform-browser';
import { API_URL } from 'shared-catalog';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Este bootstrap.ts solo corre cuando mfe-explore arranca standalone (su propia URL, sin el
// shell). Cuando el shell compone sus rutas vía Module Federation, este archivo nunca se
// ejecuta — el shell bootstrapea la única aplicación Angular real y es su propio bootstrap.ts el
// que tiene que proveer API_URL para que las llamadas HTTP de este MFE, ya compuestas, usen la
// URL real del backend (ver apps/shell/src/bootstrap.ts).

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
// apunta a localhost:8080, igual que el default de API_URL, así que sobreescribirlo aquí no
// cambia nada en dev.
async function loadApiUrlProvider() {
  const config = await fetch('runtime-config.json').then((res) => res.json());
  return { provide: API_URL, useValue: config.apiUrl };
}

Promise.all([enableMockingIfRequested(), loadApiUrlProvider()])
  .then(([, apiUrlProvider]) =>
    bootstrapApplication(AppComponent, {
      ...appConfig,
      providers: [...appConfig.providers, apiUrlProvider],
    })
  )
  .catch((err) => console.error(err));
