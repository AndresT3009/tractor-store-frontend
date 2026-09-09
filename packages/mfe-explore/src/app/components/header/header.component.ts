import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

// Expuesto vía Module Federation: es el mismo header que usan explore, decide y checkout
// cuando el shell compone sus rutas, no solo la app de explore corriendo standalone.
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
  `,
})
export class HeaderComponent {}
