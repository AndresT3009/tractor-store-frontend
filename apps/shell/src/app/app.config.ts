import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { appRoutes } from './app.routes';
import { httpErrorInterceptor } from './http-error.interceptor';

// Module Federation solo trae las rutas de cada MFE (loadChildren), no su app.config: el
// shell es el único que bootstrapea un Router real, así que es quien debe darles HttpClient
// a los resolvers de las rutas compuestas.
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([httpErrorInterceptor])),
  ],
};
