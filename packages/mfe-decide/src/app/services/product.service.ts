import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, InjectionToken } from '@angular/core';
import type { Observable } from 'rxjs';
import type { ProductDetail, Recommendation } from 'shared-catalog';

export const CATALOG_API_URL = new InjectionToken<string>('CATALOG_API_URL', {
  providedIn: 'root',
  factory: () => 'http://localhost:8080/api/catalog',
});

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(CATALOG_API_URL);

  getProduct(id: string): Observable<ProductDetail> {
    return this.http.get<ProductDetail>(`${this.baseUrl}/products/${id}`);
  }

  getRecommendations(skus: string[]): Observable<Recommendation[]> {
    const params = new HttpParams().set('skus', skus.join(','));
    return this.http.get<Recommendation[]>(`${this.baseUrl}/recommendations`, { params });
  }
}
