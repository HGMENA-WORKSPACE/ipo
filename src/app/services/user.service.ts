import { effect, inject, Injectable, linkedSignal, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../environments/environments';
import { User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly translateService = inject(TranslateService);
  //
  private readonly STORAGE_KEY = environment.storage.storageKey;
  //
  private readonly _preferredLanguage = signal(environment.defaultLanguaje);
  private readonly _currentUser = signal<User>(environment.defaultUser as User);
  private readonly _availableLanguages = signal(
    Object.entries(environment.languajes).map(([key, code]) => ({
      label: key,
      code,
    })),
  );
  protected readonly _currentLang = linkedSignal(
    () =>
      this.availableLanguages().find((lang) => lang.code === this._preferredLanguage()) ||
      this.availableLanguages()[0],
  );
  //
  public readonly currentUser = this._currentUser.asReadonly();
  public readonly currentLang = this._currentLang.asReadonly();
  public readonly preferredLanguage = this._preferredLanguage.asReadonly();
  public readonly availableLanguages = this._availableLanguages.asReadonly();

  constructor() {
    this.loadFromStorage();

    effect(() => {
      const user = this._currentUser();
      if (typeof localStorage === 'undefined') return;
      this.translateService.use(this._preferredLanguage());
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    });
  }

  setLanguage(lang: 'es' | 'en'): void {
    this._preferredLanguage.set(lang);
    this._currentUser.update((user) => ({ ...user, preferredLanguage: lang }));
  }

  updateReadingPosition(bookId: string, position: number): void {
    this._currentUser.update((user) => ({
      ...user,
      readingPosition: { ...user.readingPosition, [bookId]: position },
    }));
  }

  getReadingPosition(bookId: string): number {
    return this._currentUser().readingPosition[bookId] || 0;
  }

  addFavorite(bookId: string): void {
    this._currentUser.update((user) => {
      if (user.favorites.includes(bookId)) {
        return user;
      }
      return { ...user, favorites: [...user.favorites, bookId] };
    });
  }

  removeFavorite(bookId: string): void {
    this._currentUser.update((user) => ({
      ...user,
      favorites: user.favorites.filter((id) => id !== bookId),
    }));
  }

  isFavorite(bookId: string): boolean {
    return this._currentUser().favorites.includes(bookId);
  }

  private loadFromStorage(): void {
    if (typeof localStorage === 'undefined') return;

    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        this._currentUser.set({
          ...environment.defaultUser,
          ...parsed,
          createdAt: new Date(parsed.createdAt),
        });
        this._preferredLanguage.set(parsed.preferredLanguage || 'es');
      } catch {
        this._currentUser.set(environment.defaultUser as User);
      }
    }
  }
}
