import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  readonly isOpen = input(false);
  readonly title = input('');
  readonly closeOnBackdrop = input(true);
  readonly showActions = input(true);
  readonly size = input<'sm' | 'md' | 'lg'>('md');

  readonly close = output<void>();

  readonly modalClass = input(() => {
    const sizes: Record<string, string> = {
      sm: 'w-full max-w-md',
      md: 'w-full max-w-lg',
      lg: 'w-full max-w-2xl'
    };
    return sizes[this.size()];
  });

  onBackdropClick(): boolean {
    return this.closeOnBackdrop();
  }
}