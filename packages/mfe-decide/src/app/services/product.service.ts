import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { API_URL } from 'shared-catalog';
import type { ProductDetail } from 'shared-catalog';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_URL);

  getProduct(id: string): Observable<ProductDetail> {
    return this.http.get<ProductDetail>(`${this.baseUrl}/catalog/products/${id}`);
  }
}
