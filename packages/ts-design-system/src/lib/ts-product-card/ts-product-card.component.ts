import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import type { ProductSummary } from 'shared-catalog';

@Component({
  selector: 'ts-product-card',
  standalone: true,
  imports: [CurrencyPipe],
  encapsulation: ViewEncapsulation.ShadowDom,
  template: `
    <button type="button" class="ts-product-card" (click)="chosen.emit(product.id)">
      <img class="ts-product-card__image" [src]="product.imageUrl" [alt]="product.name" />
      <span class="ts-product-card__name">{{ product.name }}</span>
      @if (showPrice) {
        <span class="ts-product-card__price">{{ product.price | currency }}</span>
      }
    </button>
  `,
  styles: `
    :host {
      display: block;
      font-family: var(--font-family-base);
    }

    .ts-product-card {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-2);
      width: 100%;
      padding: var(--space-4);
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: var(--card-radius);
      box-shadow: var(--card-shadow);
      cursor: pointer;
      text-align: left;
      font: inherit;
    }

    .ts-product-card__image {
      width: 100%;
      aspect-ratio: 4 / 3;
      object-fit: cover;
      border-radius: var(--radius-md);
      background: var(--color-surface-muted);
    }

    .ts-product-card__name {
      font-weight: 600;
      color: var(--color-text);
    }

    .ts-product-card__price {
      color: var(--color-text-muted);
    }
  `,
})
export class TsProductCardComponent {
  @Input({ required: true }) product!: ProductSummary;
  @Input() showPrice = true;
  @Output() chosen = new EventEmitter<string>();
}
