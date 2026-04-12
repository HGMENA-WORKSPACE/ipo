import { Injectable, signal, computed, effect } from '@angular/core';
import { Download, DownloadState } from '../models';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  private readonly STORAGE_KEY = 'librivox_downloads';

  private readonly _downloads = signal<Download[]>([]);

  readonly inProgress = computed(() => 
    this._downloads().filter(d => d.status === 'in_progress' || d.status === 'pending' || d.status === 'paused')
  );

  readonly completed = computed(() => 
    this._downloads().filter(d => d.status === 'completed')
  );

  constructor() {
    this.loadFromStorage();

    effect(() => {
      const downloads = this._downloads();
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(downloads));
      }
    });
  }

  addDownload(book: Book, format: 'mp3' | 'ogg'): Download {
    const existing = this._downloads().find(d => d.bookId === book.key && d.format === format);
    if (existing) {
      return existing;
    }

    const download: Download = {
      id: crypto.randomUUID(),
      bookId: book.key,
      bookTitle: book.title,
      authorName: book.author_name?.[0] || 'Unknown',
      coverUrl: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg` : undefined,
      format,
      status: 'pending',
      progress: 0,
      totalBytes: this.estimateSize(book),
      downloadedBytes: 0,
      startedAt: new Date()
    };

    this._downloads.update(list => [...list, download]);
    this.simulateDownload(download.id);

    return download;
  }

  pauseDownload(id: string): void {
    this._downloads.update(list =>
      list.map(d => d.id === id ? { ...d, status: 'paused' as const } : d)
    );
  }

  resumeDownload(id: string): void {
    this._downloads.update(list =>
      list.map(d => d.id === id ? { ...d, status: 'in_progress' as const } : d)
    );
    this.simulateDownload(id);
  }

  cancelDownload(id: string): void {
    this._downloads.update(list => list.filter(d => d.id !== id));
  }

  deleteDownload(id: string): void {
    this._downloads.update(list => list.filter(d => d.id !== id));
  }

  getDownload(id: string): Download | undefined {
    return this._downloads().find(d => d.id === id);
  }

  isBookDownloaded(bookId: string): boolean {
    return this._downloads().some(d => d.bookId === bookId && d.status === 'completed');
  }

  private simulateDownload(id: string): void {
    const interval = setInterval(() => {
      const download = this._downloads().find(d => d.id === id);
      if (!download || download.status === 'paused' || download.status === 'completed') {
        clearInterval(interval);
        return;
      }

      const increment = Math.random() * 10 + 5;
      const newProgress = Math.min(download.progress + increment, 100);
      const newDownloaded = Math.floor((newProgress / 100) * download.totalBytes);

      this._downloads.update(list =>
        list.map(d => d.id === id ? {
          ...d,
          progress: newProgress,
          downloadedBytes: newDownloaded,
          status: newProgress >= 100 ? 'completed' as const : d.status,
          completedAt: newProgress >= 100 ? new Date() : undefined
        } : d)
      );

      if (newProgress >= 100) {
        clearInterval(interval);
      }
    }, 500);
  }

  private estimateSize(book: Book): number {
    const baseSize = 50 * 1024 * 1024;
    const yearFactor = book.first_publish_year ? (2025 - book.first_publish_year) / 100 : 0;
    return Math.floor(baseSize * (1 + yearFactor));
  }

  private loadFromStorage(): void {
    if (typeof localStorage === 'undefined') return;

    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        this._downloads.set(parsed.map((d: any) => ({
          ...d,
          startedAt: new Date(d.startedAt),
          completedAt: d.completedAt ? new Date(d.completedAt) : undefined
        })));
      } catch {
        this._downloads.set([]);
      }
    }
  }
}