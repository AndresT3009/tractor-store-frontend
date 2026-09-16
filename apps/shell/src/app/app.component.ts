import { loadRemoteModule } from '@angular-architects/native-federation';
import { NgComponentOutlet } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, signal, Type } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule, NgComponentOutlet],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  // <ts-button-element> se registra como Custom Element (ver main.ts), no como componente
  // Angular importado: este schema le dice al compilador que no lo valide como si fuera uno.
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  // Header, Footer y MiniCart son de otros equipos (explore y checkout respectivamente): el
  // shell solo los compone en su layout vía Module Federation, no los conoce en build-time.
  protected readonly headerComponent = signal<Type<unknown> | null>(null);
  protected readonly footerComponent = signal<Type<unknown> | null>(null);
  protected readonly miniCartComponent = signal<Type<unknown> | null>(null);

  constructor() {
    loadRemoteModule('mfeExplore', './Header')
      .then((m) => this.headerComponent.set(m.HeaderComponent))
      .catch((err) => console.error(err));
    loadRemoteModule('mfeExplore', './Footer')
      .then((m) => this.footerComponent.set(m.FooterComponent))
      .catch((err) => console.error(err));
    loadRemoteModule('mfeCheckout', './MiniCart')
      .then((m) => this.miniCartComponent.set(m.MiniCartComponent))
      .catch((err) => console.error(err));
  }
}
