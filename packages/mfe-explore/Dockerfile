# syntax=docker/dockerfile:1

# Build de monorepo Nx: el contexto es la raíz del repo (Railway: Root Directory "/", Dockerfile
# Path "packages/mfe-explore/Dockerfile"), porque nx build necesita el workspace completo, no solo
# esta app.
FROM node:22-alpine AS build
WORKDIR /repo

RUN corepack enable && corepack prepare pnpm@11.24.0 --activate

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json nx.json tsconfig.base.json eslint.config.mjs ./
COPY apps apps
COPY packages packages
RUN pnpm install --frozen-lockfile

RUN npx nx build mfe-explore --configuration=production

FROM nginx:1.27-alpine AS runtime
WORKDIR /usr/share/nginx/html

# mfe-explore no consume a ningún otro MFE (es un remoto puro, initFederation() sin argumentos);
# su runtime-config.json solo trae apiUrl, sin bloque "federation".
COPY --from=build /repo/dist/packages/mfe-explore/browser ./
COPY packages/mfe-explore/runtime-config.template.json ./runtime-config.template.json
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY deploy/docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 8080
ENTRYPOINT ["/docker-entrypoint.sh"]
