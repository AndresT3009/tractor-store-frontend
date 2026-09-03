import { Injectable, signal } from '@angular/core';
import type { ProductDetail, Recommendation, Stock } from 'shared-catalog';

interface ProductState {
  product: ProductDetail | null;
  selectedSku: string | null;
  stock: Stock | null;
  recommendations: Recommendation[];
}

const initialState: ProductState = {
  product: null,
  selectedSku: null,
  stock: null,
  recommendations: [],
};

@Injectable({ providedIn: 'root' })
export class ProductStore {
  private readonly state = signal<ProductState>(initialState);
  readonly snapshot = this.state.asReadonly();

  setProduct(product: ProductDetail): void {
    this.state.update((current) => ({ ...current, product }));
  }

  setSelectedSku(sku: string): void {
    this.state.update((current) => ({ ...current, selectedSku: sku }));
  }

  setStock(stock: Stock): void {
    this.state.update((current) => ({ ...current, stock }));
  }

  setRecommendations(recommendations: Recommendation[]): void {
    this.state.update((current) => ({ ...current, recommendations }));
  }
}
