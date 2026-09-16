const nxPreset = require('@nx/jest/preset').default;

// El preset de Nx solo genera reporte 'html' por defecto; se agrega 'lcov' porque SonarCloud
// (y otras herramientas externas de cobertura) lo necesitan en ese formato.
module.exports = { ...nxPreset, coverageReporters: ['html', 'lcov', 'text-summary'] };
