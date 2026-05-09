import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ModalComponent } from './modal.component';

@Component({
  selector: 'confirm-dialog',
  styleUrl: './confirm-dialog.component.css',
  templateUrl: './confirm-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ModalComponent],
})
export class ConfirmDialogComponent {
  readonly title = input('');
  readonly message = input('');
  readonly isOpen = input(false);
  readonly defaultConfirm = input(true);
  readonly cancelText = input('Cancelar');
  readonly confirmText = input('Confirmar');
  //
  readonly confirm = output<void>();
  readonly cancel = output<void>();
}
