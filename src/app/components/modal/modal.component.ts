import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'modal',
  styleUrl: './modal.component.css',
  templateUrl: './modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class ModalComponent {
  readonly title = input('');
  readonly isOpen = input(false);
  readonly showActions = input(true);
  readonly closeOnBackdrop = input(true);
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  //
  readonly close = output<void>();
  //
  protected readonly modalClass = computed(() => {
    const sizes: Record<string, string> = {
      sm: 'w-full max-w-md',
      md: 'w-full max-w-lg',
      lg: 'w-full max-w-2xl',
    };
    return sizes[this.size()];
  });
  /**
   *
   * @returns
   */
  onBackdropClick(): boolean {
    return this.closeOnBackdrop();
  }
}
