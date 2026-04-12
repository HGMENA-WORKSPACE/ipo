import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, computed, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CardComponent, InputComponent } from '../../components';
import { Book, BookFilters } from '../../models';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, CardComponent, InputComponent, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private bookService = inject(BookService);

  books = signal<Book[]>([]);
  loading = signal(false);
  query = '';
  currentPage = signal(1);
  totalCount = signal(0);
  filters = signal<BookFilters>({});

  readonly hasMore = computed(() => this.books().length < this.totalCount());

  readonly totalPages = computed(() => Math.ceil(this.totalCount() / 20));

  readonly pageNumbers = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const pages: number[] = [];
    
    for (let i = Math.max(1, current - 2); i <= Math.min(total, current + 2); i++) {
      pages.push(i);
    }
    
    return pages;
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['q']) {
        this.query = params['q'];
        this.search(this.query);
      }
    });
  }

  onSearch(term: string): void {
    if (term.trim()) {
      this.query = term;
      this.currentPage.set(1);
      this.search(term);
    }
  }

  private search(term: string, page: number = 1): void {
    this.loading.set(true);
    
    this.bookService.search(term, page).subscribe({
      next: (result) => {
        this.books.set(result.docs);
        this.totalCount.set(result.num_found);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  loadMore(): void {
    const nextPage = this.currentPage() + 1;
    this.currentPage.set(nextPage);
    this.search(this.query, nextPage);
  }

  goToPage(page: number): void {
    this.currentPage.set(page);
    this.search(this.query, page);
  }

  setGenreFilter(genre: string): void {
    this.filters.update(f => ({ ...f, genre: genre || undefined }));
  }
}