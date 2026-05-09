import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  model,
  resource,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Book } from '../../models';
import { RequestService } from '../../services/reques.service';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'list-books',
  styleUrl: './list-books.css',
  templateUrl: './list-books.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, TranslatePipe],
})
export class ListBooks {
  private readonly requestService = inject(RequestService);
  //
  readonly page = model(1);
  readonly limit = model.required<number>();
  readonly query = model.required<string>();
  //
  readonly totalCount = model(0);
  //
  //
  private readonly params = computed(() => ({
    page: this.page(),
    query: this.query(),
    limit: this.limit(),
  }));
  //
  private readonly result = resource({
    params: () => this.params(),
    loader: ({ params }) =>
      this.requestService
        .get<any>('/search.json?', {
          q: params.query,
          page: params.page,
          limit: params.limit,
        })
        .then((result) => {
          this.totalCount.set(result.num_found);
          return result.docs;
        })
        .catch(() => []),
  });
  protected readonly loading = computed(() => this.result.isLoading());
  protected readonly books = computed(() => this.result.value() as Book[]);
  protected readonly totalPages = computed(() => Math.ceil(this.totalCount() / 20));
  protected readonly hasMore = computed(() => this.books().length < this.totalCount());
  protected readonly pageNumbers = computed(() => {
    const total = this.totalPages();
    const current = this.page();
    const pages: number[] = [];

    for (let i = Math.max(1, current - 2); i <= Math.min(total, current + 2); i++) {
      pages.push(i);
    }

    return pages;
  });
  /**
   * Loads more books.
   */
  loadMore(): void {
    this.page.update((nextPage) => nextPage + 1);
  }
  /**
   *
   * @param page
   */
  goToPage(page: number): void {
    this.page.set(page);
  }
}
