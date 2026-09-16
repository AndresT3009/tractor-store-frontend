import { bootstrapApplication } from '@angular/platform-browser';
import { API_URL } from 'shared-catalog';
import { registerTsDesignSystemElements } from 'ts-design-system';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

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

// Cuando el shell compone las rutas de los 3 MFEs vía Module Federation, es este bootstrap — el
// único que realmente arranca una aplicación Angular — el que tiene que proveer API_URL: el
// bootstrap.ts propio de cada MFE nunca corre en ese escenario, solo cuando cada uno arranca
// standalone en su propia URL. Sin este provider, las llamadas HTTP de los MFEs compuestos caen
// al default de desarrollo local (http://localhost:8080/api) sin importar qué diga el
// runtime-config.json de cada MFE por separado.
async function loadApiUrlProvider() {
  const config = await fetch('runtime-config.json').then((res) => res.json());
  return { provide: API_URL, useValue: config.apiUrl };
}

Promise.all([enableMockingIfRequested(), registerTsDesignSystemElements(), loadApiUrlProvider()])
  .then(([, , apiUrlProvider]) =>
    bootstrapApplication(AppComponent, {
      ...appConfig,
      providers: [...appConfig.providers, apiUrlProvider],
    })
  )
  .catch((err) => console.error(err));
