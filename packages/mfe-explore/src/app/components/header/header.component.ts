import { Component, OnDestroy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { HttpErrorEvent } from 'shared-catalog';
import { HTTP_ERROR_EVENT } from 'shared-catalog';

const THEME_STORAGE_KEY = 'tractor-store:theme';
type Theme = 'light' | 'dark';

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
        <a routerLink="/" class="flex items-center gap-2">
          <img src="/images/logo.png" alt="The Tractor Store" class="h-9 w-auto" />
        </a>
        <nav class="flex items-center gap-6 text-sm text-text-muted">
          <a routerLink="/">Explorar</a>
          <a routerLink="/stores">Tiendas</a>
          <button
            type="button"
            data-testid="theme-toggle"
            class="rounded-full border border-border p-2 text-text hover:bg-surface-muted"
            [attr.aria-label]="theme() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
            (click)="toggleTheme()"
          >
            @if (theme() === 'dark') {
              <!-- sol -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                class="h-4 w-4"
              >
                <circle cx="12" cy="12" r="4" />
                <path
                  d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
                />
              </svg>
            } @else {
              <!-- luna -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="h-4 w-4"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            }
          </button>
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
  // El tema es una preferencia global del documento (afecta a todos los MFEs compuestos a la
  // vez, vía [data-theme] en <html>), no algo local de este componente — por eso se aplica al
  // documentElement en vez de a una clase de este header.
  protected readonly theme = signal<Theme>(this.readStoredTheme());

  private readonly onHttpError = (event: Event) => {
    this.lastError.set((event as HttpErrorEvent).detail);
  };

  constructor() {
    window.addEventListener(HTTP_ERROR_EVENT, this.onHttpError);
    this.applyTheme(this.theme());
  }

  ngOnDestroy(): void {
    window.removeEventListener(HTTP_ERROR_EVENT, this.onHttpError);
  }

  dismiss(): void {
    this.lastError.set(null);
  }

  toggleTheme(): void {
    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(next);
    this.applyTheme(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Modo privado / almacenamiento bloqueado: el tema sigue funcionando, solo no persiste.
    }
  }

  private applyTheme(theme: Theme): void {
    document.documentElement.setAttribute('data-theme', theme);
  }

  private readStoredTheme(): Theme {
    try {
      return localStorage.getItem(THEME_STORAGE_KEY) === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  }
}
