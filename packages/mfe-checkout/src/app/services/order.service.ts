import { HttpClient } from '@angular/common/http';
import { inject, Injectable, InjectionToken } from '@angular/core';
import type { Observable } from 'rxjs';
import type { Order, PlaceOrderRequest } from 'shared-catalog';

export const ORDER_API_URL = new InjectionToken<string>('ORDER_API_URL', {
  providedIn: 'root',
  factory: () => 'http://localhost:8080/api/orders',
});

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(ORDER_API_URL);

  placeOrder(request: PlaceOrderRequest): Observable<Order> {
    return this.http.post<Order>(this.baseUrl, request, { withCredentials: true });
  }

  getOrder(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${id}`, { withCredentials: true });
  }
}
