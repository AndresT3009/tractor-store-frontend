import { inject } from '@angular/core';
import type { ResolveFn } from '@angular/router';
import type { HomeData } from 'shared-catalog';
import { CatalogFacade } from '../../state/catalog.facade';

export const homeResolver: ResolveFn<HomeData> = () => inject(CatalogFacade).loadHome();
