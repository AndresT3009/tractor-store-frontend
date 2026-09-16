import { initFederation } from '@angular-architects/native-federation';

// El manifest se sirve como archivo estático (apps/shell/public/runtime-config.json en dev; en la
// imagen de Docker lo reescribe el entrypoint con las URLs reales de cada servicio) en vez de ir
// hardcodeado aquí, para no tener que reconstruir el build por cada entorno.
fetch('runtime-config.json')
  .then((res) => res.json())
  .then((config) => initFederation(config.federation))
  .catch((err) => console.error(err))
  .then(() => import('./bootstrap'))
  .catch((err) => console.error(err));
