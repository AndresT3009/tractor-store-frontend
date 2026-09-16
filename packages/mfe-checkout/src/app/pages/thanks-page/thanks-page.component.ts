import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { Order } from 'shared-catalog';
import { TsButtonComponent } from 'ts-design-system';

@Component({
  selector: 'app-thanks-page',
  standalone: true,
  imports: [RouterLink, TsButtonComponent],
  template: `
    <h1 class="mb-4 text-2xl font-semibold text-text">Thanks for your order, {{ order.firstName }}!</h1>
    <p class="text-text-muted">We'll notify you when it's ready for pickup.</p>

    <a routerLink="/" class="mt-8 inline-block">
      <ts-button>Continue shopping</ts-button>
    </a>
  `,
})
export class ThanksPageComponent {
  @Input({ required: true }) order!: Order;
}
