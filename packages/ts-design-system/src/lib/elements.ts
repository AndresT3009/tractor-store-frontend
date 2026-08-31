import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { TsButtonComponent } from './ts-button/ts-button.component';

/**
 * Fase 4/2: registra los componentes del design system como Custom Elements reales
 * (`customElements.define`), consumibles fuera de Angular. `createApplication()` arma un Injector
 * mínimo sin bootstrapear una app completa — es el reemplazo moderno (standalone) de crear un
 * NgModule solo para alimentar `createCustomElement`.
 */
export async function registerTsDesignSystemElements(): Promise<void> {
  if (customElements.get('ts-button')) {
    return;
  }

  const app = await createApplication();
  const tsButtonElement = createCustomElement(TsButtonComponent, {
    injector: app.injector,
  });
  customElements.define('ts-button', tsButtonElement);
}
