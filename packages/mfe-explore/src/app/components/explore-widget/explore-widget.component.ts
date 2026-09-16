import { Component, inject, OnInit, signal, ViewEncapsulation } from '@angular/core';
import type { CategoryTeaser } from 'shared-catalog';
import { CatalogService } from '../../services/catalog.service';

// Verificación del contrato Web Component: mfe-explore también se compila como Custom Element
// standalone (target "custom-element" en project.json), sin pasar por Module Federation, para
// probar que puede montarse en cualquier página HTML aunque no tenga Angular ni el shell.
@Component({
  // El selector Angular es interno (nunca se usa en un template); el nombre público del
  // Custom Element ('mfe-explore-widget') se define aparte en custom-element.main.ts.
  selector: 'app-explore-widget',
  standalone: true,
  encapsulation: ViewEncapsulation.ShadowDom,
  template: `
    <div class="widget">
      <h2>The Tractor Store — Explore</h2>
      @if (categories().length > 0) {
        <ul>
          @for (category of categories(); track category.category) {
            <li>{{ category.title }}</li>
          }
        </ul>
      } @else {
        <p>Loading…</p>
      }
    </div>
  `,
  styles: `
    .widget {
      font-family: system-ui, sans-serif;
      border: 1px solid #d8d3c9;
      border-radius: 8px;
      padding: 1rem 1.5rem;
      max-width: 320px;
    }
    h2 {
      margin: 0 0 0.5rem;
      font-size: 1.1rem;
      color: #2f5e33;
    }
    ul {
      margin: 0;
      padding-left: 1.1rem;
    }
  `,
})
export class ExploreWidgetComponent implements OnInit {
  private readonly catalogService = inject(CatalogService);

  protected readonly categories = signal<CategoryTeaser[]>([]);

  ngOnInit(): void {
    this.catalogService.getHome().subscribe((home) => this.categories.set(home.categories));
  }
}
