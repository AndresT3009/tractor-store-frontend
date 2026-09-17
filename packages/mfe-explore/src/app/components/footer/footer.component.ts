import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="border-t border-border bg-surface-muted px-6 py-8 text-sm text-text-muted">
      <div class="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <span>The Tractor Store</span>
        <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
          <a href="mailto:darwin.a1120@gmail.com" class="hover:text-primary">
            darwin.a1120&#64;gmail.com
          </a>
          <a href="tel:+573015781171" class="hover:text-primary">+57 301 578 1171</a>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {}
