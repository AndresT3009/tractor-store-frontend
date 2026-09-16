# Contribuir

## Flujo de trabajo

1. Ramas desde `develop`: `feat/...`, `fix/...`, `refactor/...`.
2. Commits en español, formato [Conventional Commits](https://www.conventionalcommits.org/es/):
   `tipo(scope): descripción`, con el `scope` como el proyecto Nx afectado cuando aplica
   (`feat(mfe-checkout): ...`, `fix(shell): ...`).
3. Antes de abrir el PR, en local:
   ```bash
   npx nx affected --target=lint,test,build
   npx nx e2e shell-e2e
   ```
4. PR contra `develop`, usando la plantilla. `main` solo recibe merges desde `develop` para release.

## Convenciones del monorepo

- Librerías compartidas van en `packages/`, apps en `apps/`. Antes de crear una librería nueva,
  revisar si ya existe algo parecido en `shared-catalog` o `ts-design-system`.
- `@nx/enforce-module-boundaries` corre en `lint`: si un import cruza un límite de scope no permitido,
  el error dice exactamente qué regla se violó — no silenciarlo con un `eslint-disable` sin entender
  primero por qué existe la regla.
- Cualquier componente/servicio expuesto vía Module Federation (`federation.config.js`) necesita su
  ruta declarada como `workspace-root-relative` (`./packages/mfe-x/...`, no `./src/...`) y agregada al
  `"files"` de `tsconfig.app.json` de esa app si no se referencia desde `main.ts`.

## Estilo de código

ESLint + Prettier (vía `@nx/eslint`). `npx nx affected --target=lint --fix` corrige lo que se pueda
automáticamente.
