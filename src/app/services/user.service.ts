import { Injectable, signal, effect } from '@angular/core';
import { User, DEFAULT_USER } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly STORAGE_KEY = 'librivox_user';

  private readonly _currentUser = signal<User>(DEFAULT_USER);
  private readonly _preferredLanguage = signal<'es' | 'en'>('es');

  readonly currentUser = this._currentUser.asReadonly();
  readonly preferredLanguage = this._preferredLanguage.asReadonly();

  constructor() {
    this.loadFromStorage();

    effect(() => {
      const user = this._currentUser();
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
      }
    });
  }

  setLanguage(lang: 'es' | 'en'): void {
    this._preferredLanguage.set(lang);
    this._currentUser.update(user => ({ ...user, preferredLanguage: lang }));
  }

  updateReadingPosition(bookId: string, position: number): void {
    this._currentUser.update(user => ({
      ...user,
      readingPosition: { ...user.readingPosition, [bookId]: position }
    }));
  }

  getReadingPosition(bookId: string): number {
    return this._currentUser().readingPosition[bookId] || 0;
  }

  addFavorite(bookId: string): void {
    this._currentUser.update(user => {
      if (user.favorites.includes(bookId)) {
        return user;
      }
      return { ...user, favorites: [...user.favorites, bookId] };
    });
  }

  removeFavorite(bookId: string): void {
    this._currentUser.update(user => ({
      ...user,
      favorites: user.favorites.filter(id => id !== bookId)
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
          ...DEFAULT_USER,
          ...parsed,
          createdAt: new Date(parsed.createdAt)
        });
        this._preferredLanguage.set(parsed.preferredLanguage || 'es');
      } catch {
        this._currentUser.set(DEFAULT_USER);
      }
    }
  }
}