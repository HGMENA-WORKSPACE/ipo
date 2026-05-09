import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  resource,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { map } from 'rxjs';
import { environment } from '../../../environments/environments';
import { CardComponent, Heading, ModalComponent, PlayerComponent } from '../../components';
import { Book, BookDetail } from '../../models';
import { DownloadService, RequestService, UserService } from '../../services';

@Component({
  selector: 'book-page',
  styleUrl: './book-page.component.css',
  templateUrl: './book-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Heading,
    CommonModule,
    RouterModule,
    CardComponent,
    PlayerComponent,
    ModalComponent,
    TranslatePipe,
  ],
})
export class BookPageComponent {
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);
  private readonly requestService = inject(RequestService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly downloadService = inject(DownloadService);
  //
  protected readonly showPlayer = signal(false);
  protected readonly showDownloadModal = signal(false);
  protected readonly showContinueModal = signal(false);
  protected readonly workId = toSignal(
    this.activatedRoute.params.pipe(map((params) => params['id'] ?? '')),
  ); // signal<string | null>(null);
  //
  protected readonly bookRequest = resource({
    params: () => this.workId(),
    loader: ({ params }) =>
      this.requestService
        .get<any>('/works/' + params + '.json')
        .then((data) => ({
          cover_i: data.covers?.[0] || null,
          key: data.key || '',
          title: data.title || '',
          subjects: data.subjects || [],
          edition_count: data.edition_count,
          author_name: data.subject_people || [],
          language: data.languages?.map((l: any) => l.key) || [],
          description: data.description?.value ?? data.description ?? '',
          first_publish_year: data.first_publish_date
            ? parseInt(data.first_publish_date)
            : undefined,
        }))
        .catch(() => null),
  });
  protected readonly book = computed(() => this.bookRequest.value() as BookDetail | null);
  protected readonly cover_i = computed(() => this.book()?.cover_i || null);
  protected readonly genre = computed(() => this.book()?.subjects?.[0] || 'N/A');
  protected readonly title = computed(() => this.book()?.title || 'Unknown Title');
  protected readonly author_name = computed(
    () => this.book()?.author_name?.[0] || 'Unknown Author',
  );
  protected readonly first_publish_year = computed(
    () => this.book()?.first_publish_year || undefined,
  );
  protected readonly description = computed(
    () => this.book()?.description || 'No description available',
  );
  protected readonly language = computed(
    () => this.book()?.language?.[0]?.replace('/languages/', '') || 'English',
  );
  protected readonly coverUrl = computed(() =>
    this.book() && this.book()?.cover_i
      ? `${environment.services.openlibrary.coversUrl}/b/id/${this.book()!.cover_i}-M.jpg`
      : '',
  );
  protected readonly formatSize = computed(() => {
    const b = this.book();
    if (!b) return '50 MB';
    const baseSize = 50;
    const yearFactor = b.first_publish_year ? (2025 - b.first_publish_year) / 100 : 0;
    return `${Math.floor(baseSize * (1 + yearFactor))} MB`;
  });
  protected readonly relatedBooksRequest = resource({
    params: () => this.book() ?? { author_name: '' },
    loader: ({ params }) =>
      this.requestService
        .get<any>('/search.json?', {
          q: `${params.author_name[0]?.replace(/[^a-zA-Z]/g, '') || []}`,
          page: 1,
          limit: 10,
        })
        .then((result) => result.docs)
        .catch(() => null),
  });
  protected readonly relatedBooks = computed(() => {
    const result = this.relatedBooksRequest.value();
    return result ? (result as Book[]).filter((b) => b.key !== this.book()?.key) : [];
  });
  protected readonly loading = computed(
    () => this.bookRequest.isLoading() || this.relatedBooksRequest.isLoading(),
  );
  protected readonly isFavorite = computed(() =>
    this.book() ? this.userService.isFavorite(this.book()!.key) : false,
  );
  /**
   *
   * @returns
   */
  toggleFavorite(): void {
    const bookKey = this.book()?.key;
    if (!bookKey) return;

    if (this.isFavorite()) this.userService.removeFavorite(bookKey);
    else this.userService.addFavorite(bookKey);
  }
  /**
   *
   */
  playBook(): void {
    const savedPosition = this.userService.getReadingPosition(this.book()!.key);
    if (savedPosition > 0) {
      this.showContinueModal.set(true);
    } else {
      this.showPlayer.set(true);
    }
  }
  /**
   *
   */
  continuePlayback(): void {
    this.showContinueModal.set(false);
    this.showPlayer.set(true);
  }

  startOver(): void {
    this.showContinueModal.set(false);
    this.userService.updateReadingPosition(this.book()!.key, 0);
    this.showPlayer.set(true);
  }
  /**
   *
   * @param format
   */
  download(format: 'mp3' | 'ogg'): void {
    const b = this.book();
    if (b) {
      this.downloadService.addDownload(b as Book, format);
      this.router.navigate(['/downloads']);
    }
  }
}
