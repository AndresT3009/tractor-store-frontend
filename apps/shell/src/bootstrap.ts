import { bootstrapApplication } from '@angular/platform-browser';
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

enableMockingIfRequested()
  .then(() => registerTsDesignSystemElements())
  .then(() => bootstrapApplication(AppComponent, appConfig))
  .catch((err) => console.error(err));
