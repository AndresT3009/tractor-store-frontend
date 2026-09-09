#!/bin/sh
set -eu

# Reescribe el runtime-config.json de dev (localhost) con las URLs/valores reales de Railway,
# leídos de variables de entorno del servicio, antes de servir los archivos estáticos. Si una app
# no trae plantilla (no aplica en ninguna hoy, pero deja el script genérico), simplemente no hace
# nada.
TEMPLATE=/usr/share/nginx/html/runtime-config.template.json
CONFIG=/usr/share/nginx/html/runtime-config.json

if [ -f "$TEMPLATE" ]; then
  envsubst < "$TEMPLATE" > "$CONFIG"
  rm "$TEMPLATE"
fi

exec nginx -g 'daemon off;'
