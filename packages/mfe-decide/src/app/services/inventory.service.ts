import { HttpClient } from '@angular/common/http';
import { inject, Injectable, InjectionToken } from '@angular/core';
import type { Observable } from 'rxjs';
import type { Stock } from 'shared-catalog';

export const INVENTORY_API_URL = new InjectionToken<string>('INVENTORY_API_URL', {
  providedIn: 'root',
  factory: () => 'http://localhost:8080/api/inventory',
});

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(INVENTORY_API_URL);

  getStock(sku: string): Observable<Stock> {
    return this.http.get<Stock>(`${this.baseUrl}/${sku}`);
  }
}
