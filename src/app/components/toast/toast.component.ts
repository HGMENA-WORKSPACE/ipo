import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'toast',
  styleUrl: './toast.component.css',
  templateUrl: './toast.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class ToastComponent {
  private readonly toastService = inject(ToastService);
  //
  protected readonly toasts = this.toastService.toasts;
  /**
   *
   */
  protected remove(id: string): void {
    this.toastService.remove(id);
  }
}
  