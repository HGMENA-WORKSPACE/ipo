import { Injectable, signal } from '@angular/core';
import { Toast } from '../models/toast.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly _toasts = signal<Toast[]>([]);

  readonly toasts = this._toasts.asReadonly();

  show(message: string, type: Toast['type'] = 'info', duration: number = 3000): void {
    const base = 'bg-white border';
    const colors: Record<string, string> = {
      error: 'border-red-200',
      info: 'border-blue-200',
      warning: 'border-yellow-200',
      success: 'border-green-200',
    };
    const toast: Toast = {
      type,
      message,
      duration,
      id: crypto.randomUUID(),
      class: `${base} ${colors[type] || colors['info']}`,
    };

    this._toasts.update((list) => [...list, toast]);

    if (duration > 0) {
      setTimeout(() => this.remove(toast.id), duration);
    }
  }

  success(message: string, duration?: number): void {
    this.show(message, 'success', duration);
  }

  error(message: string, duration?: number): void {
    this.show(message, 'error', duration);
  }

  warning(message: string, duration?: number): void {
    this.show(message, 'warning', duration);
  }

  info(message: string, duration?: number): void {
    this.show(message, 'info', duration);
  }

  remove(id: string): void {
    this._toasts.update((list) => list.filter((t) => t.id !== id));
  }

  clear(): void {
    this._toasts.set([]);
  }
}
