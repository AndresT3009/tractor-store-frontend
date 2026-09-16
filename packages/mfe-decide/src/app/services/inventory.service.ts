import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { Stock } from 'shared-catalog';
import { DECIDE_API_URL } from '../decide-api-url.token';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(DECIDE_API_URL);

  getStock(sku: string): Observable<Stock> {
    return this.http.get<Stock>(`${this.baseUrl}/inventory/${sku}`);
  }
}
