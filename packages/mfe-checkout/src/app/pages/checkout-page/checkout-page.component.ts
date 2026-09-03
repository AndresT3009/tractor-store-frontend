import { Component, inject, Input } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import type { Store } from 'shared-catalog';
import { TsButtonComponent } from 'ts-design-system';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, TsButtonComponent],
  template: `
    <h1 class="mb-8 text-2xl font-semibold text-text">Checkout</h1>

    <form [formGroup]="form" (ngSubmit)="placeOrder()" class="max-w-lg space-y-6">
      <div class="grid grid-cols-2 gap-4">
        <label class="block">
          <span class="text-sm text-text-muted">First name</span>
          <input
            type="text"
            formControlName="firstName"
            class="mt-1 w-full rounded border border-border px-3 py-2"
          />
        </label>
        <label class="block">
          <span class="text-sm text-text-muted">Last name</span>
          <input
            type="text"
            formControlName="lastName"
            class="mt-1 w-full rounded border border-border px-3 py-2"
          />
        </label>
      </div>

      <label class="block">
        <span class="text-sm text-text-muted">Store pickup</span>
        <select formControlName="storeId" class="mt-1 w-full rounded border border-border px-3 py-2">
          <option value="" disabled>Choose a store</option>
          @for (store of stores; track store.id) {
            <option [value]="store.id">{{ store.name }} — {{ store.city }}</option>
          }
        </select>
      </label>

      <div class="flex items-center justify-between">
        <a routerLink="/cart" class="text-sm text-text-muted">Back to cart</a>
        <ts-button [disabled]="form.invalid" (press)="placeOrder()">Place order</ts-button>
      </div>
    </form>
  `,
})
export class CheckoutPageComponent {
  @Input({ required: true }) stores!: Store[];

  private readonly formBuilder = inject(FormBuilder);
  private readonly orderService = inject(OrderService);
  private readonly router = inject(Router);

  submitted = false;

  form = this.formBuilder.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    storeId: ['', Validators.required],
  });

  placeOrder(): void {
    if (this.form.invalid) {
      return;
    }

    this.orderService.placeOrder(this.form.getRawValue()).subscribe((order) => {
      this.submitted = true;
      this.router.navigate(['/thanks', order.id]);
    });
  }
}
