import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { TsButtonComponent } from './ts-button/ts-button.component';

// createApplication() arma un Injector mínimo sin bootstrapear una app completa: es el reemplazo
// moderno (standalone) de crear un NgModule solo para alimentar createCustomElement.
//
// Se registra como 'ts-button-element', no 'ts-button': el selector Angular del componente
// (`ts-button`) ya lo usan varias páginas de los MFEs como import normal de Angular
// (`TsButtonComponent`). Componer todo en un solo documento (Module Federation) hace que el
// Custom Elements registry sea global — si ambos usaran el mismo nombre, el navegador intentaría
// asignarle un segundo shadow root a un elemento que Angular ya renderizó como componente
// (`NotSupportedError: Shadow root cannot be created...`).
export async function registerTsDesignSystemElements(): Promise<void> {
  if (customElements.get('ts-button-element')) {
    return;
  }

  const app = await createApplication();
  const tsButtonElement = createCustomElement(TsButtonComponent, {
    injector: app.injector,
  });
  customElements.define('ts-button-element', tsButtonElement);
}
