import { Component, Input, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { Order } from 'shared-catalog';
import { TsButtonComponent } from 'ts-design-system';

interface ConfettiPiece {
  left: string;
  delay: string;
  duration: string;
  color: string;
}

const CONFETTI_COLORS = [
  'var(--color-primary)',
  'var(--color-accent)',
  'var(--color-primary-hover)',
];

@Component({
  selector: 'app-thanks-page',
  standalone: true,
  imports: [RouterLink, TsButtonComponent],
  template: `
    @if (showConfetti()) {
      <!-- Muy tenue a propósito: solo confirma "esto se procesó", no distrae del mensaje. -->
      <div class="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        @for (piece of confetti; track $index) {
          <span
            class="confetti-piece"
            [style.left]="piece.left"
            [style.background]="piece.color"
            [style.animation-delay]="piece.delay"
            [style.animation-duration]="piece.duration"
          ></span>
        }
      </div>
    }

    <h1 class="mb-4 text-2xl font-semibold text-text">Thanks for your order, {{ order.firstName }}!</h1>
    <p class="text-text-muted">We'll notify you when it's ready for pickup.</p>

    <a routerLink="/" class="mt-8 inline-block">
      <ts-button>Continue shopping</ts-button>
    </a>

    <style>
      .confetti-piece {
        position: absolute;
        top: -5%;
        width: 8px;
        height: 8px;
        border-radius: 2px;
        opacity: 0.55;
        animation-name: confetti-fall;
        animation-timing-function: ease-in;
        animation-fill-mode: forwards;
      }

      @keyframes confetti-fall {
        from {
          transform: translateY(0) rotate(0deg);
          opacity: 0.55;
        }
        to {
          transform: translateY(70vh) rotate(200deg);
          opacity: 0;
        }
      }
    </style>
  `,
})
export class ThanksPageComponent implements OnInit {
  @Input({ required: true }) order!: Order;

  protected readonly showConfetti = signal(true);
  protected readonly confetti: ConfettiPiece[] = Array.from({ length: 18 }, (_, i) => ({
    left: `${(i / 18) * 100 + Math.random() * 4}%`,
    delay: `${Math.random() * 0.6}s`,
    duration: `${2 + Math.random() * 1.2}s`,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  }));

  ngOnInit(): void {
    // Se quita del DOM tras la animación: no hace falta que quede un overlay invisible flotando
    // sobre el resto de la página.
    setTimeout(() => this.showConfetti.set(false), 3500);
  }
}
