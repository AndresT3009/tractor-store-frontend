import { inject, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class AddToCartFormFactory {
  private readonly formBuilder = inject(FormBuilder);

  create(sku: string) {
    return this.formBuilder.nonNullable.group({
      sku: [sku, Validators.required],
    });
  }
}
