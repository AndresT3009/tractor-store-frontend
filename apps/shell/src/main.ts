import { bootstrapApplication } from '@angular/platform-browser';
import { registerTsDesignSystemElements } from 'ts-design-system';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

registerTsDesignSystemElements()
  .then(() => bootstrapApplication(AppComponent, appConfig))
  .catch((err) => console.error(err));
