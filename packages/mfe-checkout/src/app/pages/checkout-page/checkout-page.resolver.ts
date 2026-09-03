import { inject } from '@angular/core';
import type { ResolveFn } from '@angular/router';
import type { Store } from 'shared-catalog';
import { CatalogService } from '../../services/catalog.service';

export const storesResolver: ResolveFn<Store[]> = () => inject(CatalogService).getStores();
