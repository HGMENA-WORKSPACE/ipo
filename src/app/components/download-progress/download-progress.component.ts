import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'download-progress',
  styleUrl: './download-progress.component.css',
  templateUrl: './download-progress.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class DownloadProgressComponent {
  readonly label = input('');
  readonly progress = input(0);
  readonly striped = input(false);
  readonly showLabel = input(true);
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly labelClass = input(() => 'text-gray-600');
  readonly percentClass = input(() => 'text-gray-500');
  readonly variant = input<'default' | 'success' | 'warning' | 'danger'>('default');
  //
  protected readonly containerClass = computed(() => {
    const sizes: Record<string, string> = {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3',
    };
    return sizes[this.size()];
  });
  protected readonly barClass = computed(() => {
    const colors: Record<string, string> = {
      default: 'bg-indigo-600',
      success: 'bg-green-600',
      warning: 'bg-yellow-500',
      danger: 'bg-red-600',
    };
    const base = colors[this.variant()];
    const pattern = this.striped() ? 'bg-stripes' : '';
    return `${base} ${pattern} rounded-full`;
  });
  //
  protected readonly Math = Math;
}
