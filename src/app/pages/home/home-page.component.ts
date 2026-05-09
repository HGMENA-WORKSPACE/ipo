import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Heading, ListBooks } from '../../components';

@Component({
  selector: 'home-page',
  styleUrl: './home-page.component.css',
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Heading, ListBooks, CommonModule, RouterModule, TranslatePipe],
})
export class HomePageComponent {
  private readonly router = inject(Router);
  //
  protected readonly page = signal(1);
  protected readonly limit = signal(5);
  protected readonly queryPopular = signal('trending');
  protected readonly queryRecommended = signal('popular audiobooks');
  /**
   *
   * @param params
   */
  onSearch(params: string): void {
    if (params.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: params } });
    }
  }
}
