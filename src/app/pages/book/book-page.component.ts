import { Component, signal, inject, computed, ChangeDetectionStrategy, OnInit, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { CardComponent, ButtonComponent, PlayerComponent, ProgressComponent, ModalComponent } from '../../components';
import { BookService, DownloadService, UserService } from '../../services';
import { Book, BookDetail } from '../../models';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-book-page',
  standalone: true,
  imports: [CommonModule, RouterModule, CardComponent, PlayerComponent, ModalComponent, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './book-page.component.html',
  styleUrl: './book-page.component.css'
})
export class BookPageComponent implements OnInit {
  id = input<string>();
  
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private bookService = inject(BookService);
  private downloadService = inject(DownloadService);
  private userService = inject(UserService);

  book = signal<BookDetail | null>(null);
  relatedBooks = signal<Book[]>([]);
  loading = signal(true);
  showDownloadModal = signal(false);
  showContinueModal = signal(false);
  showPlayer = signal(false);

  readonly coverUrl = computed(() => {
    const b = this.book();
    return b?.cover_i ? `https://covers.openlibrary.org/b/id/${b.cover_i}-M.jpg` : '';
  });

  readonly formatSize = computed(() => {
    const b = this.book();
    if (!b) return '50 MB';
    const baseSize = 50;
    const yearFactor = b.first_publish_year ? (2025 - b.first_publish_year) / 100 : 0;
    return `${Math.floor(baseSize * (1 + yearFactor))} MB`;
  });

  readonly genre = computed(() => {
    return this.book()?.subjects?.[0] || 'N/A';
  });

  readonly language = computed(() => {
    return this.book()?.language?.[0]?.replace('/languages/', '') || 'English';
  });

  ngOnInit(): void {
    const workId = this.id() || this.route.snapshot.paramMap.get('id');
    if (workId) {
      this.loadBook(workId);
    }
  }

  private loadBook(workId: string): void {
    this.loading.set(true);
    
    this.bookService.getBookById(`/works/${workId}`).subscribe({
      next: (detail) => {
        this.book.set(detail);
        this.loading.set(false);
        
        if (detail?.author_name?.[0]) {
          this.loadRelated(detail.author_name[0]);
        }
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  private loadRelated(authorName: string): void {
    this.bookService.getBooksByAuthor(authorName).subscribe({
      next: (books) => {
        this.relatedBooks.set(books.slice(0, 6));
      }
    });
  }

  playBook(): void {
    const savedPosition = this.userService.getReadingPosition(this.book()!.key);
    if (savedPosition > 0) {
      this.showContinueModal.set(true);
    } else {
      this.showPlayer.set(true);
    }
  }

  continuePlayback(): void {
    this.showContinueModal.set(false);
    this.showPlayer.set(true);
  }

  startOver(): void {
    this.showContinueModal.set(false);
    this.userService.updateReadingPosition(this.book()!.key, 0);
    this.showPlayer.set(true);
  }

  download(format: 'mp3' | 'ogg'): void {
    const b = this.book();
    if (b) {
      this.downloadService.addDownload(b as Book, format);
      this.router.navigate(['/downloads']);
    }
  }
}