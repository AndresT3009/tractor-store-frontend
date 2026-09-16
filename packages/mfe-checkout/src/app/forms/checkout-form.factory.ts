import { inject, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

export interface CheckoutFormValue {
  firstName: string;
  lastName: string;
  storeId: string;
}

@Injectable({ providedIn: 'root' })
export class CheckoutFormFactory {
  private readonly formBuilder = inject(FormBuilder);

  create() {
    return this.formBuilder.nonNullable.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      storeId: ['', Validators.required],
    });
  }
}
