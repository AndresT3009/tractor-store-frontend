# tractor-store-frontend

Frontend de **The Tractor Store** (reto técnico Quind): monorepo Nx con Angular 19, tres
micro-frontends y una shell app, consumiendo el backend del repo hermano
`tractor-store-backend`. Sigue la [especificación de negocio](https://micro-frontends.org/tractor-store/).

## Stack

Angular 19 (Standalone Components) · Nx 20 (monorepo integrado) · pnpm · TypeScript · SCSS ·
TailwindCSS + Design Tokens · Storybook 9 · Jest · Playwright. Module Federation y MSW se suman en
fases posteriores.

## Estructura

```
apps/shell            # host: integra los tres MFEs (Module Federation, aún no configurado)
packages/mfe-explore   # equipo Explore: home, categorías, tiendas, recomendaciones
packages/mfe-decide     # equipo Decide: detalle de producto, selector de variantes
packages/mfe-checkout   # equipo Checkout: carrito, checkout, confirmación
packages/shared-catalog # modelos y eventos de dominio compartidos (sin dependencias propias)
packages/ts-design-system # librería Angular de componentes (prefijo ts-, exportable como Custom Elements)
```

Reglas de dependencia entre proyectos (`eslint.config.mjs`, `@nx/enforce-module-boundaries`): los
MFEs pueden depender de `shared-catalog` y `ts-design-system` pero no entre ellos; `shell` puede
depender de todos; `shared-catalog` no depende de nada.

## Cómo correrlo

```bash
pnpm install
pnpm serve:all        # las 4 apps a la vez, en puertos 4200-4203
npx nx serve shell    # o una app individual
```

| App | Puerto |
| --- | --- |
| shell | 4200 |
| mfe-explore | 4201 |
| mfe-decide | 4202 |
| mfe-checkout | 4203 |

## Cómo testearlo

```bash
npx nx run-many --target=lint --all
npx nx run-many --target=test --all
npx nx run-many --target=build --all
npx nx affected --target=test   # solo lo que cambió, comparado contra origin/main
```

## Design system y Storybook

```bash
pnpm storybook          # ts-design-system en modo interactivo
pnpm build-storybook    # build estático (storybook-static)
```

Los tokens de diseño viven en `packages/design-tokens` como CSS Custom Properties en tres capas
(primitivos, semánticos, de componente) y se comparten con Tailwind vía `tailwind.preset.js`. Los
componentes de `ts-design-system` se documentan con Storybook (CSF v3) y también se registran como
Custom Elements reales (`packages/ts-design-system/src/lib/elements.ts`) para consumirse fuera de
Angular.

Para conectar regresión visual con Chromatic, exporta `CHROMATIC_PROJECT_TOKEN` (token del proyecto
en [chromatic.com](https://www.chromatic.com/)) y corre `pnpm chromatic`.

## Notas de la Fase 3 (Nx monorepo)

- Workspace Nx **integrado** (un solo `package.json` raíz, resolución de proyectos locales vía
  `tsconfig.base.json` paths) en vez de "package-based" con un `package.json` por proyecto — es el
  estilo que Nx recomienda actualmente para monorepos Angular; pnpm sigue siendo el gestor de
  paquetes y `pnpm-workspace.yaml` sigue declarando `apps/*` y `packages/*` como el árbol del
  monorepo, solo que la resolución interna entre proyectos la hace Nx por TS paths en vez de por
  linking de pnpm — el resultado (nada se publica, todo se resuelve localmente) es el mismo que pide
  la guía.
- `nx run-many --target=serve --all` necesita `--parallel=4` explícito (`pnpm serve:all` ya lo
  incluye): el paralelismo por defecto de Nx es 3, y como los `serve` no terminan nunca, un cuarto
  proyecto en cola por debajo de ese límite nunca llega a arrancar.
- Sin SSR/Angular Universal: el generador de Nx lo activa por defecto en algunos presets, pero no lo
  pide la guía (es una SPA servida por Module Federation) — se removió de las 4 apps.
