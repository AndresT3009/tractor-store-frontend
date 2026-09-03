import { inject } from '@angular/core';
import type { ResolveFn } from '@angular/router';
import type { HomeData } from 'shared-catalog';
import { CatalogService } from '../../services/catalog.service';

export const homeResolver: ResolveFn<HomeData> = () => inject(CatalogService).getHome();
