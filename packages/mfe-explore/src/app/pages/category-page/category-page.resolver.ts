import { inject } from '@angular/core';
import type { ResolveFn } from '@angular/router';
import type { CategoryData } from 'shared-catalog';
import { CatalogFacade } from '../../state/catalog.facade';

export const categoryResolver: ResolveFn<CategoryData> = (route) => {
  const filter = route.paramMap.get('filter') ?? 'all';
  return inject(CatalogFacade).loadCategory(filter);
};
