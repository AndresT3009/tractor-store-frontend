import { Component, OnDestroy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { HttpErrorEvent } from 'shared-catalog';
import { HTTP_ERROR_EVENT } from 'shared-catalog';

// Expuesto vía Module Federation: es el mismo header que usan explore, decide y checkout
// cuando el shell compone sus rutas, no solo la app de explore corriendo standalone. También
// centraliza el aviso de error HTTP cross-MFE: cualquier interceptor (de cualquier MFE) que
// falle dispara HTTP_ERROR_EVENT en window, y este es el único banner que lo muestra.
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header class="border-b border-border bg-surface px-6 py-4 shadow-sm">
      <div class="mx-auto flex max-w-6xl items-center justify-between">
        <a routerLink="/" class="text-lg font-semibold text-primary">The Tractor Store</a>
        <nav class="flex items-center gap-6 text-sm text-text-muted">
          <a routerLink="/">Explorar</a>
          <a routerLink="/stores">Tiendas</a>
        </nav>
      </div>
    </header>

    @if (lastError(); as error) {
      <div
        data-testid="http-error-banner"
        class="border-b border-danger bg-surface-muted px-6 py-3 text-sm text-danger"
      >
        <div class="mx-auto flex max-w-6xl items-center justify-between">
          <span>Something went wrong loading data (HTTP {{ error.status }}).</span>
          <button type="button" class="font-semibold underline" (click)="dismiss()">
            Dismiss
          </button>
        </div>
      </div>
    }
  `,
})
export class HeaderComponent implements OnDestroy {
  protected readonly lastError = signal<HttpErrorEvent['detail'] | null>(null);

  private readonly onHttpError = (event: Event) => {
    this.lastError.set((event as HttpErrorEvent).detail);
  };

  constructor() {
    window.addEventListener(HTTP_ERROR_EVENT, this.onHttpError);
  }

  ngOnDestroy(): void {
    window.removeEventListener(HTTP_ERROR_EVENT, this.onHttpError);
  }

  dismiss(): void {
    this.lastError.set(null);
  }
}
