import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { API_URL } from 'shared-catalog';
import type { Stock } from 'shared-catalog';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_URL);

  getStock(sku: string): Observable<Stock> {
    return this.http.get<Stock>(`${this.baseUrl}/inventory/${sku}`);
  }
}
