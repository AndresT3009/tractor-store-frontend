import { HttpClient } from '@angular/common/http';
import { inject, Injectable, InjectionToken } from '@angular/core';
import type { Observable } from 'rxjs';
import type { CategoryData, HomeData, Store } from 'shared-catalog';

export const CATALOG_API_URL = new InjectionToken<string>('CATALOG_API_URL', {
  providedIn: 'root',
  factory: () => 'http://localhost:8080/api/catalog',
});

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(CATALOG_API_URL);

  getHome(): Observable<HomeData> {
    return this.http.get<HomeData>(`${this.baseUrl}/home`);
  }

  getCategory(filter: string): Observable<CategoryData> {
    return this.http.get<CategoryData>(`${this.baseUrl}/categories/${filter}`);
  }

  getStores(): Observable<Store[]> {
    return this.http.get<Store[]>(`${this.baseUrl}/stores`);
  }
}
