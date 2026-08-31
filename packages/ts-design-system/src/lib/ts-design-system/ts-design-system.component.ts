import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ts-ts-design-system',
  imports: [CommonModule],
  templateUrl: './ts-design-system.component.html',
  styleUrl: './ts-design-system.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TsDesignSystemComponent {}
