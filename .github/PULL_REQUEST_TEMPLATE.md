## Qué cambia y por qué

## Cómo probarlo

## Checklist

- [ ] `npx nx affected --target=lint,test,build` pasa en local
- [ ] Si el cambio toca un flujo de usuario, corrí `npx nx e2e shell-e2e` en local
- [ ] Si el cambio expone/quita algo vía Module Federation, actualicé el `federation.config.js`
      correspondiente y verifiqué el shell compuesto (no solo la app aislada)
