import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { Store } from 'shared-catalog';
import { CHECKOUT_API_URL } from '../checkout-api-url.token';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(CHECKOUT_API_URL);

  getStores(): Observable<Store[]> {
    return this.http.get<Store[]>(`${this.baseUrl}/catalog/stores`);
  }
}
