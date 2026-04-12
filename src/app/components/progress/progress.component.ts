import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent {
  readonly progress = input(0);
  readonly showLabel = input(true);
  readonly label = input('');
  readonly variant = input<'default' | 'success' | 'warning' | 'danger'>('default');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly striped = input(false);

  readonly labelClass = input(() => 'text-gray-600');

  readonly percentClass = input(() => 'text-gray-500');

  readonly containerClass = input(() => {
    const sizes: Record<string, string> = {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3'
    };
    return sizes[this.size()];
  });

  readonly barClass = input(() => {
    const colors: Record<string, string> = {
      default: 'bg-indigo-600',
      success: 'bg-green-600',
      warning: 'bg-yellow-500',
      danger: 'bg-red-600'
    };
    
    const base = colors[this.variant()];
    const pattern = this.striped() 
      ? 'bg-stripes' 
      : '';
    
    return `${base} ${pattern} rounded-full`;
  });

  protected readonly Math = Math;
}