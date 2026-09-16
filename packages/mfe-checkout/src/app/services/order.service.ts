import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { API_URL } from 'shared-catalog';
import type { Order, PlaceOrderRequest } from 'shared-catalog';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_URL);

  placeOrder(request: PlaceOrderRequest): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}/orders`, request, { withCredentials: true });
  }

  getOrder(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/orders/${id}`, { withCredentials: true });
  }
}
