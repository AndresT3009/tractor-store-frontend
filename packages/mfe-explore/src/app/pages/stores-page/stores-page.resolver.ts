import { inject } from '@angular/core';
import type { ResolveFn } from '@angular/router';
import type { Store } from 'shared-catalog';
import { CatalogFacade } from '../../state/catalog.facade';

export const storesResolver: ResolveFn<Store[]> = () => inject(CatalogFacade).loadStores();
