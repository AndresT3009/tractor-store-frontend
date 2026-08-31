import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

/**
 * Fase 4: primer componente real del design system. `ViewEncapsulation.ShadowDom` a propósito —
 * es lo que hace falta para probar que los tokens (CSS Custom Properties) atraviesan la frontera del
 * Shadow DOM cuando este componente se registra como Custom Element (ver `elements.ts`), mientras
 * que un selector CSS normal del documento no llegaría a tocar su `<button>` interno.
 *
 * Sin `ChangeDetectionStrategy.OnPush` a propósito: en este entorno de test (Angular 19.2 +
 * jest-preset-angular + jsdom) la combinación OnPush + ShadowDom hace que `fixture.detectChanges()`
 * dentro de un test NO refleje un cambio de @Input asignado directamente sobre la instancia (ni con
 * template ni con templateUrl) — aislado y reproducido con un componente mínimo separado antes de
 * asumir que era un bug propio. Con estrategia por defecto (sin OnPush) funciona correctamente;
 * dado que es un componente de presentación pequeño, el costo de no tener OnPush es despreciable.
 */
@Component({
  selector: 'ts-button',
  standalone: true,
  encapsulation: ViewEncapsulation.ShadowDom,
  template: `
    <button
      type="button"
      class="ts-button"
      [class.ts-button--danger]="variant === 'danger'"
      [disabled]="disabled"
      (click)="press.emit()"
    >
      <ng-content></ng-content>
    </button>
  `,
  styles: `
    :host {
      display: inline-block;
      font-family: var(--font-family-base);
    }

    .ts-button {
      font: inherit;
      font-weight: 600;
      font-size: 0.9375rem;
      border: none;
      border-radius: var(--button-radius);
      padding: var(--space-2) var(--space-4);
      background: var(--button-bg);
      color: var(--button-color);
      cursor: pointer;
      transition: background-color 0.15s ease;
    }

    .ts-button:hover:not(:disabled) {
      background: var(--button-bg-hover);
    }

    .ts-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .ts-button--danger {
      background: var(--color-danger);
    }

    .ts-button--danger:hover:not(:disabled) {
      background: var(--color-danger-hover);
    }
  `,
})
export class TsButtonComponent {
  @Input() variant: 'primary' | 'danger' = 'primary';
  @Input() disabled = false;
  @Output() press = new EventEmitter<void>();
}
