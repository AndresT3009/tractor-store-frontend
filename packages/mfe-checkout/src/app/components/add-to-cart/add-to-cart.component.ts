import { Component, inject, Input, OnChanges, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TsButtonComponent } from 'ts-design-system';
import { AddToCartFormFactory } from '../../forms/add-to-cart-form.factory';
import { CartFacade } from '../../state/cart.facade';

// Sin ruta propia: se expone vía Module Federation y se embebe en la página de producto de
// mfe-decide, que es dueña de cuál variante (sku) está seleccionada en cada momento.
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
export class AddToCartComponent implements OnChanges {
  @Input({ required: true }) sku!: string;

  private readonly formFactory = inject(AddToCartFormFactory);
  private readonly cartFacade = inject(CartFacade);

  protected readonly submitting = signal(false);
  form!: ReturnType<AddToCartFormFactory['create']>;

  // NgComponentOutlet reasigna el sku (vía setInput) sin destruir la instancia cuando cambia la
  // variante seleccionada, así que el formulario se reconstruye en cada cambio, no solo al crear.
  ngOnChanges(): void {
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
