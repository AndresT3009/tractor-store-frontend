import { CUSTOM_ELEMENTS_SCHEMA, Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import type { CartItemAddedEvent } from 'shared-catalog';
import { CART_ITEM_ADDED_EVENT } from 'shared-catalog';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  // <ts-button> se registra como Custom Element (ver main.ts), no como componente Angular
  // importado: este schema le dice al compilador que no lo valide como si fuera uno.
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  title = 'shell';

  // El carrito vive en mfe-checkout (detrás de la cookie de sesión); el shell solo escucha el
  // evento cross-MFE que emite al agregar un ítem, sin depender de su estado interno.
  protected readonly cartItemCount = signal(0);

  private readonly onCartItemAdded = (event: Event) => {
    this.cartItemCount.set((event as CartItemAddedEvent).detail.totalItems);
  };

  constructor() {
    window.addEventListener(CART_ITEM_ADDED_EVENT, this.onCartItemAdded);
    inject(DestroyRef).onDestroy(() =>
      window.removeEventListener(CART_ITEM_ADDED_EVENT, this.onCartItemAdded)
    );
  }
}
