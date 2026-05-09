export interface Toast {
  id: string;
  class: string;
  message: string;
  duration?: number;
  type: 'success' | 'error' | 'warning' | 'info';
}
