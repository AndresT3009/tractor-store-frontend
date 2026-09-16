import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import type { Variant } from 'shared-catalog';

@Component({
  selector: 'ts-variant-option',
  standalone: true,
  encapsulation: ViewEncapsulation.ShadowDom,
  template: `
    <button
      type="button"
      class="ts-variant-option"
      [class.ts-variant-option--selected]="selected"
      [style.background-color]="variant.colorHex"
      [attr.aria-pressed]="selected"
      [attr.aria-label]="variant.colorName"
      (click)="chosen.emit(variant.sku)"
    ></button>
  `,
  styles: `
    :host {
      display: inline-block;
    }

    .ts-variant-option {
      width: var(--variant-option-size);
      height: var(--variant-option-size);
      border-radius: 50%;
      border: 2px solid var(--variant-option-border);
      cursor: pointer;
      padding: 0;
    }

    .ts-variant-option--selected {
      border-color: var(--variant-option-border-selected);
      outline: 2px solid var(--variant-option-border-selected);
      outline-offset: 2px;
    }
  `,
})
export class TsVariantOptionComponent {
  @Input({ required: true }) variant!: Variant;
  @Input() selected = false;
  @Output() chosen = new EventEmitter<string>();
}
