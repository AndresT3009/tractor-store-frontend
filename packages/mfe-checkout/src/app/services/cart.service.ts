import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { API_URL } from 'shared-catalog';
import type { Cart, MiniCart } from 'shared-catalog';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_URL);

  getCart(): Observable<Cart> {
    return this.http.get<Cart>(`${this.baseUrl}/cart`, { withCredentials: true });
  }

  getMiniCart(): Observable<MiniCart> {
    return this.http.get<MiniCart>(`${this.baseUrl}/cart/mini`, { withCredentials: true });
  }

  addItem(sku: string): Observable<Cart> {
    return this.http.post<Cart>(`${this.baseUrl}/cart/items`, { sku }, { withCredentials: true });
  }

  removeItem(sku: string): Observable<Cart> {
    return this.http.delete<Cart>(`${this.baseUrl}/cart/items/${sku}`, { withCredentials: true });
  }
}
