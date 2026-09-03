import { HttpClient } from '@angular/common/http';
import { inject, Injectable, InjectionToken } from '@angular/core';
import type { Observable } from 'rxjs';
import type { Cart, MiniCart } from 'shared-catalog';

export const CART_API_URL = new InjectionToken<string>('CART_API_URL', {
  providedIn: 'root',
  factory: () => 'http://localhost:8080/api/cart',
});

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(CART_API_URL);

  getCart(): Observable<Cart> {
    return this.http.get<Cart>(this.baseUrl, { withCredentials: true });
  }

  getMiniCart(): Observable<MiniCart> {
    return this.http.get<MiniCart>(`${this.baseUrl}/mini`, { withCredentials: true });
  }

  addItem(sku: string): Observable<Cart> {
    return this.http.post<Cart>(`${this.baseUrl}/items`, { sku }, { withCredentials: true });
  }

  removeItem(sku: string): Observable<Cart> {
    return this.http.delete<Cart>(`${this.baseUrl}/items/${sku}`, { withCredentials: true });
  }
}
