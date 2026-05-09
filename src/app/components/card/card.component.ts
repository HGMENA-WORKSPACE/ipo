import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from '../../../environments/environments';
import { Book } from '../../models';

@Component({
  selector: 'card',
  styleUrl: './card.component.css',
  templateUrl: './card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule],
})
export class CardComponent {
  readonly link = input<string>('');
  readonly book = input.required<Book>();
  //
  readonly onPlay = output<MouseEvent>();
  //
  readonly coverUrl = computed(() =>
    !!this.book()?.cover_i
      ? `${environment.services.openlibrary.coversUrl}/b/id/${this.book()!.cover_i}-M.jpg`
      : '',
  );
}
