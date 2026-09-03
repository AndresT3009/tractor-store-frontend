import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { HomeData } from 'shared-catalog';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <h1 class="mb-8 text-2xl font-semibold text-text">The Tractor Store</h1>
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
      @for (teaser of home.categories; track teaser.category) {
        <a
          [routerLink]="['/category', teaser.category]"
          class="group block overflow-hidden rounded-lg border border-border bg-surface shadow-sm"
        >
          <img [src]="teaser.imageUrl" [alt]="teaser.title" class="aspect-video w-full object-cover" />
          <span class="block p-4 font-semibold text-text group-hover:text-primary">{{
            teaser.title
          }}</span>
        </a>
      }
    </div>
  `,
})
export class HomePageComponent {
  @Input({ required: true }) home!: HomeData;
}
