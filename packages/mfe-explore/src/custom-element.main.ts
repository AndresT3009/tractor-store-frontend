import { provideHttpClient } from '@angular/common/http';
import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { ExploreWidgetComponent } from './app/components/explore-widget/explore-widget.component';

async function registerExploreWidget(): Promise<void> {
  if (customElements.get('mfe-explore-widget')) {
    return;
  }

  const app = await createApplication({
    providers: [provideHttpClient()],
  });
  const element = createCustomElement(ExploreWidgetComponent, { injector: app.injector });
  customElements.define('mfe-explore-widget', element);
}

registerExploreWidget().catch((err) => console.error(err));
