import { InjectionToken } from '@angular/core';

// Los tres MFEs (explore, decide, checkout) apuntan al mismo backend, así que comparten un único
// token en vez de uno propio cada uno. Vive en shared-catalog (no en cada MFE) porque, cuando el
// shell compone las rutas de un MFE vía Module Federation, ese MFE nunca vuelve a bootstrapear su
// propia aplicación (su bootstrap.ts no corre) — es el shell quien necesita poder sobreescribir
// este valor en su propio árbol de providers para que las llamadas HTTP compuestas usen la URL
// real del backend en vez de caer siempre al default de desarrollo local.
export const API_URL = new InjectionToken<string>('API_URL', {
  providedIn: 'root',
  factory: () => 'http://localhost:8080/api',
});
