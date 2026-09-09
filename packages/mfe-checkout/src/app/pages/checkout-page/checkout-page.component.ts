import { loadRemoteModule } from '@angular-architects/native-federation';
import { NgComponentOutlet } from '@angular/common';
import { Component, inject, OnDestroy, signal, Type } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import type { StoreSelectedEvent } from 'shared-catalog';
import { EXPLORE_STORE_SELECTED_EVENT } from 'shared-catalog';
import { TsButtonComponent } from 'ts-design-system';
import { CheckoutFormFactory } from '../../forms/checkout-form.factory';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, TsButtonComponent, NgComponentOutlet],
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

      @if (storePickerComponent(); as cmp) {
        <ng-container *ngComponentOutlet="cmp" />
      }

      <div class="flex items-center justify-between">
        <a routerLink="/cart" class="text-sm text-text-muted">Back to cart</a>
        <ts-button [disabled]="form.invalid" (press)="placeOrder()">Place order</ts-button>
      </div>
    </form>
  `,
})
export class CheckoutPageComponent implements OnDestroy {
  private readonly formFactory = inject(CheckoutFormFactory);
  private readonly orderService = inject(OrderService);
  private readonly router = inject(Router);

  submitted = false;
  form = this.formFactory.create();

  // El selector de tienda es de Explore; se embebe vía Module Federation y comunica la
  // selección con un CustomEvent (NgComponentOutlet no permite enlazar un @Output()).
  protected readonly storePickerComponent = signal<Type<unknown> | null>(null);

  private readonly onStoreSelected = (event: Event) => {
    const { storeId } = (event as StoreSelectedEvent).detail;
    this.form.controls.storeId.setValue(storeId);
  };

  constructor() {
    loadRemoteModule('mfeExplore', './StorePicker')
      .then((m) => this.storePickerComponent.set(m.StorePickerComponent))
      .catch((err) => console.error(err));
    window.addEventListener(EXPLORE_STORE_SELECTED_EVENT, this.onStoreSelected);
  }

  ngOnDestroy(): void {
    window.removeEventListener(EXPLORE_STORE_SELECTED_EVENT, this.onStoreSelected);
  }

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
