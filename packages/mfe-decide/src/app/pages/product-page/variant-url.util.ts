import type { Params } from '@angular/router';

// Codifica/decodifica la variante seleccionada como query param (?sku=...), para que la URL sea la
// fuente de verdad de qué variante se está viendo (compartible, recargable).
export function encodeVariantQueryParams(sku: string): Params {
  return { sku };
}

export function decodeVariantQueryParams(params: Params): string | null {
  return typeof params['sku'] === 'string' ? params['sku'] : null;
}
