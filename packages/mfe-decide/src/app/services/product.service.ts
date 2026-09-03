import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { ProductDetail, Recommendation } from 'shared-catalog';
import { DECIDE_API_URL } from '../decide-api-url.token';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(DECIDE_API_URL);

  getProduct(id: string): Observable<ProductDetail> {
    return this.http.get<ProductDetail>(`${this.baseUrl}/catalog/products/${id}`);
  }

  getRecommendations(skus: string[]): Observable<Recommendation[]> {
    const params = new HttpParams().set('skus', skus.join(','));
    return this.http.get<Recommendation[]>(`${this.baseUrl}/catalog/recommendations`, { params });
  }
}
