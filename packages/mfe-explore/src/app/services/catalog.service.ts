import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { CategoryData, HomeData, Store } from 'shared-catalog';
import { EXPLORE_API_URL } from '../explore-api-url.token';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(EXPLORE_API_URL);

  getHome(): Observable<HomeData> {
    return this.http.get<HomeData>(`${this.baseUrl}/catalog/home`);
  }

  getCategory(filter: string): Observable<CategoryData> {
    return this.http.get<CategoryData>(`${this.baseUrl}/catalog/categories/${filter}`);
  }

  getStores(): Observable<Store[]> {
    return this.http.get<Store[]>(`${this.baseUrl}/catalog/stores`);
  }
}
