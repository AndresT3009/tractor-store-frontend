import { inject } from '@angular/core';
import type { ResolveFn } from '@angular/router';
import type { CategoryData } from 'shared-catalog';
import { CatalogService } from '../../services/catalog.service';

export const categoryResolver: ResolveFn<CategoryData> = (route) => {
  const filter = route.paramMap.get('filter') ?? 'all';
  return inject(CatalogService).getCategory(filter);
};
