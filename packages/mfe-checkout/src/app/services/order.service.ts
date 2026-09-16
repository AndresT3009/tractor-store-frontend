import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { Order, PlaceOrderRequest } from 'shared-catalog';
import { CHECKOUT_API_URL } from '../checkout-api-url.token';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(CHECKOUT_API_URL);

  placeOrder(request: PlaceOrderRequest): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}/orders`, request, { withCredentials: true });
  }

  getOrder(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/orders/${id}`, { withCredentials: true });
  }
}
