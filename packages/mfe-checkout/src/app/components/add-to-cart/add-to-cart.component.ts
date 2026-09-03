import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TsButtonComponent } from 'ts-design-system';
import { AddToCartFormFactory } from '../../forms/add-to-cart-form.factory';
import { CartFacade } from '../../state/cart.facade';

// Componente propio de Checkout, pensado para exponerse vía Module Federation (Fase 9) y
// embeberse en la página de producto de mfe-decide — de ahí que no tenga ruta propia todavía.
@Component({
  selector: 'app-add-to-cart',
  standalone: true,
  imports: [ReactiveFormsModule, TsButtonComponent],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <ts-button [disabled]="form.invalid || submitting()" (press)="submit()">
        {{ submitting() ? 'Adding…' : 'Add to basket' }}
      </ts-button>
    </form>
  `,
})
export class AddToCartComponent implements OnInit {
  @Input({ required: true }) sku!: string;

  private readonly formFactory = inject(AddToCartFormFactory);
  private readonly cartFacade = inject(CartFacade);

  protected readonly submitting = signal(false);
  form!: ReturnType<AddToCartFormFactory['create']>;

  ngOnInit(): void {
    this.form = this.formFactory.create(this.sku);
  }

  submit(): void {
    if (this.form.invalid || this.submitting()) {
      return;
    }

    this.submitting.set(true);
    this.cartFacade.addItem(this.form.getRawValue().sku).subscribe({
      next: () => this.submitting.set(false),
      error: () => this.submitting.set(false),
    });
  }
}
