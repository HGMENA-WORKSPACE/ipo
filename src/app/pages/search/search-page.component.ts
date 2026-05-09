import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { distinctUntilChanged, map } from 'rxjs';
import { Heading, ListBooks } from '../../components';
import { BookFilters } from '../../models';

@Component({
  selector: 'search-page',
  styleUrl: './search-page.component.css',
  templateUrl: './search-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Heading,
    ListBooks,
    FormsModule,
    CommonModule,
    RouterModule,
    TranslateModule,
  ],
})
export class SearchPageComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  //
  protected readonly page = signal(1);
  protected readonly query = signal('');
  protected readonly limit = signal(10);
  protected readonly totalCount = signal(0);
  protected readonly filters = signal<BookFilters>({});
  //
  protected readonly params = toSignal(
    this.route.queryParams.pipe(
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      map((params) => {
        if (params['q']) {
          this.query.set(params['q']);
        }
      }),
    ),
  );
  /**
   *
   */
  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      )
      .subscribe((params) => {
        if (params['q']) {
          this.query.set(params['q']);
        }
      });
  }
  /**
   *
   * @param params
   */
  onSearch(params: string): void {
    if (params.trim()) {
      this.page.set(1);
      this.query.set(params);
      this.router.navigate(['/search'], { queryParams: { q: params } });
    }
  }
  /**
   *
   */
  setGenreFilter(genre: string): void {
    this.filters.update((f) => ({ ...f, genre: genre || undefined }));
  }
}
