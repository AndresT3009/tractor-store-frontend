# Estrategia de testing

## Niveles

- **Unitarios** (Jest + `TestBed`): componentes, stores/facades y resolvers de cada MFE. La mayoría
  mockea el servicio HTTP con `jest.fn()` — rápido y aislado, suficiente cuando lo que se verifica es
  lógica propia del componente/store.
- **Con MSW** (`*.msw.spec.ts`): una Store, un componente con `HttpClient` real y un resolver ejercitan
  la petición HTTP de verdad contra `mock-api/node`, con los **mismos handlers** que el modo `?mock=1`
  del navegador. Se usan donde vale la pena probar el contrato HTTP completo (parseo de la respuesta,
  manejo de error) en vez de confiar en que el mock a mano refleja bien la forma real de la API.
- **End-to-end** (Playwright, `apps/shell-e2e`): corre contra el shell compuesto (los 4 dev servers a
  la vez, arrancados automáticamente por la config). Cubre el flujo completo home → categoría →
  producto → variante → carrito → checkout → thanks contra `?mock=1`, el caso de error con un 500
  simulado, y el contrato Web Component de `ts-button` (Shadow DOM + Custom Events vainilla).

```bash
npx nx run-many --target=lint --all
npx nx run-many --target=test --all
npx nx run-many --target=build --all
npx nx affected --target=test        # solo lo que cambió, comparado contra origin/main
npx nx e2e shell-e2e                 # Playwright, levanta los 4 dev servers automáticamente
```

## Cobertura

```bash
npx nx run-many --target=test --all --configuration=ci
```

La configuración `ci` del preset de Jest (`@nx/jest:jest`, ver `nx.json`) activa `codeCoverage`, con el
reporte por proyecto en `coverage/<projectRoot>/`.

Umbrales que se van a aplicar en SonarCloud una vez esté conectado el repo:

| Métrica | Umbral |
| --- | --- |
| Cobertura global | 80% |
| Cobertura de código nuevo (New Code) | 85% |
| Duplicación de código nuevo | < 3% |

El foco es **código nuevo** (Quality Gate "Sonar way" por defecto), no perseguir el 100% en código que
ya estaba antes de conectar el análisis.

## Qué no se testea (y por qué)

- El design system (`ts-design-system`) se valida con Storybook + `test-storybook` (interacciones
  visuales), no con specs de Jest por componente — es la herramienta correcta para un catálogo de UI
  puro, sin lógica de negocio propia.
- `bootstrap.ts` de cada app (el `initFederation(...)` + arranque del root component) no tiene test
  unitario: es infraestructura de arranque, y ya está cubierto en la práctica por cada corrida de
  `apps/shell-e2e`, que falla de inmediato si la federación no compone.
