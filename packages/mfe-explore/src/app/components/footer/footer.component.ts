import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="border-t border-border bg-surface-muted px-6 py-8 text-sm text-text-muted">
      <div class="mx-auto max-w-6xl">The Tractor Store</div>
    </footer>
  `,
})
export class FooterComponent {}
