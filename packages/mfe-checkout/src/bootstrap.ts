import { bootstrapApplication } from '@angular/platform-browser';
import { enableMockingIfRequested } from 'mock-api/browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

enableMockingIfRequested()
  .then(() => bootstrapApplication(AppComponent, appConfig))
  .catch((err) => console.error(err));
