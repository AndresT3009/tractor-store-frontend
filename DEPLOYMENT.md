# Despliegue (Railway)

Las 4 apps (`shell`, `mfe-explore`, `mfe-decide`, `mfe-checkout`) se despliegan como 4 servicios
independientes dentro del mismo proyecto de Railway, cada uno construido desde su propio
`Dockerfile` con el **contexto de build en la raíz del repo** (necesario porque `nx build` requiere
el workspace completo, no solo la carpeta de esa app).

## Servicios a crear

Para cada una de las 4 apps, "New" → "GitHub Repo" → este repo, y en la configuración del
servicio (Settings → Source):

| Servicio | Root Directory | Dockerfile Path |
| --- | --- | --- |
| shell | `/` | `apps/shell/Dockerfile` |
| mfe-explore | `/` | `packages/mfe-explore/Dockerfile` |
| mfe-decide | `/` | `packages/mfe-decide/Dockerfile` |
| mfe-checkout | `/` | `packages/mfe-checkout/Dockerfile` |

Cada imagen sirve sus estáticos con nginx en el puerto 8080 (`EXPOSE 8080` en el Dockerfile);
Railway lo detecta solo.

## Por qué no hay URLs hardcodeadas

En dev, cada app hardcodea `http://localhost:420X` para hablar con las demás y con el backend
(`http://localhost:8080`). En Railway esas URLs no existen hasta que el servicio se crea — y Railway
solo genera un dominio propio por servicio. Por eso `main.ts`/`bootstrap.ts` de cada app leen su
configuración de un `runtime-config.json` servido como archivo estático (ver
`apps/shell/public/runtime-config.json` y equivalentes, con los valores de `localhost` para dev), y
la imagen de Docker trae además un `runtime-config.template.json` (con placeholders `${VAR}`) que un
script de arranque (`deploy/docker-entrypoint.sh`, vía `envsubst`) reescribe con los valores reales
justo antes de levantar nginx — así una misma imagen sirve para cualquier entorno sin rebuild.

## Variables de entorno por servicio

Railway permite referenciar el dominio de otro servicio del mismo proyecto con
`${{NombreDelServicio.RAILWAY_PUBLIC_DOMAIN}}` — se resuelve solo, sin copiar/pegar URLs a mano.

| Servicio | Variables |
| --- | --- |
| **mfe-explore** | `API_URL=https://<dominio-del-backend>/api` |
| **mfe-decide** | `API_URL=https://<dominio-del-backend>/api`, `MFE_EXPLORE_URL=https://${{mfe-explore.RAILWAY_PUBLIC_DOMAIN}}`, `MFE_CHECKOUT_URL=https://${{mfe-checkout.RAILWAY_PUBLIC_DOMAIN}}` |
| **mfe-checkout** | `API_URL=https://<dominio-del-backend>/api`, `MFE_EXPLORE_URL=https://${{mfe-explore.RAILWAY_PUBLIC_DOMAIN}}` |
| **shell** | `MFE_EXPLORE_URL=https://${{mfe-explore.RAILWAY_PUBLIC_DOMAIN}}`, `MFE_DECIDE_URL=https://${{mfe-decide.RAILWAY_PUBLIC_DOMAIN}}`, `MFE_CHECKOUT_URL=https://${{mfe-checkout.RAILWAY_PUBLIC_DOMAIN}}` |

`<dominio-del-backend>` es la URL pública del servicio `backend` del repo `tractor-store-backend`
(puede referenciarse igual con `${{backend.RAILWAY_PUBLIC_DOMAIN}}` si ambos repos viven en el mismo
proyecto de Railway; si son proyectos separados, hay que copiar la URL a mano).

## Orden recomendado

1. Desplegar `mfe-explore` primero (no depende de nadie más que del backend).
2. Desplegar `mfe-decide` y `mfe-checkout` (dependen de `mfe-explore`).
3. Desplegar `shell` (depende de los tres).
4. Volver al servicio `backend` (repo `tractor-store-backend`) y completar `CORS_ALLOWED_ORIGINS`
   con las 4 URLs `https://...up.railway.app` que Railway asignó.

## Verificar

- Abrir la URL del `shell`: debe cargar el home compuesto (viene de `mfe-explore`) y poder navegar a
  producto (`mfe-decide`) y carrito (`mfe-checkout`) sin errores de consola por CORS ni 404 en
  `remoteEntry.json`.
- `https://<dominio-de-cualquier-mfe>/runtime-config.json` debe mostrar URLs reales, no
  `${MFE_EXPLORE_URL}` sin sustituir (si aparece así, falta esa variable de entorno en ese
  servicio).
