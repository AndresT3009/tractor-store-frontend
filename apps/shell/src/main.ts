import { bootstrapApplication } from '@angular/platform-browser';
import { registerTsDesignSystemElements } from 'ts-design-system';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Fase 4: <ts-button> se consume como Custom Element real (no como componente Angular importado
// directamente) a propósito — es el mismo mecanismo que usarán los MFEs cargados vía Module
// Federation más adelante, cada uno en su propio bundle de Angular.
registerTsDesignSystemElements()
  .then(() => bootstrapApplication(AppComponent, appConfig))
  .catch((err) => console.error(err));
