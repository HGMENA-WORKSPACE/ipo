import { Component, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CardComponent, InputComponent, ButtonComponent } from '../../components';
import { BookService } from '../../services/book.service';
import { UserService } from '../../services/user.service';
import { Book } from '../../models';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterModule, CardComponent, InputComponent, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  private bookService = inject(BookService);
  private userService = inject(UserService);
  private router = inject(Router);

  recommended = signal<Book[]>([]);
  popular = signal<Book[]>([]);
  loading = signal(true);
  currentLang = signal<'es' | 'en'>('es');

  constructor() {
    this.loadData();
  }

  private loadData(): void {
    this.bookService.getRecommended().subscribe({
      next: (books) => {
        this.recommended.set(books);
        this.loadPopular();
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  private loadPopular(): void {
    this.bookService.getPopular().subscribe({
      next: (books) => {
        this.popular.set(books);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  onSearch(query: string): void {
    if (query.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: query } });
    }
  }

  toggleLanguage(): void {
    const newLang = this.currentLang() === 'es' ? 'en' : 'es';
    this.currentLang.set(newLang);
    this.userService.setLanguage(newLang);
  }
}