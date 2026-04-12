import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, catchError, of, shareReplay } from 'rxjs';
import { Book, SearchResult, BookDetail } from '../models';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly API_BASE = 'https://openlibrary.org';
  private readonly COVERS_BASE = 'https://covers.openlibrary.org';

  private readonly searchCache = new Map<string, Observable<SearchResult>>();

  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  constructor(private readonly http: HttpClient) {}

  search(query: string, page: number = 1, limit: number = 20): Observable<SearchResult> {
    const cacheKey = `${query}-${page}-${limit}`;

    if (this.searchCache.has(cacheKey)) {
      return this.searchCache.get(cacheKey)!;
    }

    this._loading.set(true);
    this._error.set(null);

    const params = new HttpParams()
      .set('q', query)
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('fields', 'key,title,author_name,first_publish_year,cover_i,author_key,ia,language,edition_count,public_scan_b,has_fulltext');

    return this.http.get<SearchResult>(`${this.API_BASE}/search.json`, { params }).pipe(
      map(response => {
        this._loading.set(false);
        return response;
      }),
      catchError(err => {
        this._loading.set(false);
        this._error.set('Error fetching books');
        return of({ start: 0, num_found: 0, docs: [] } as SearchResult);
      }),
      shareReplay(1)
    );
  }

  getBookById(workId: string): Observable<BookDetail | null> {
    this._loading.set(true);

    return this.http.get<BookDetail>(`${this.API_BASE}${workId}.json`).pipe(
      map(response => {
        this._loading.set(false);
        return this.transformToBookDetail(response);
      }),
      catchError(err => {
        this._loading.set(false);
        this._error.set('Error fetching book details');
        return of(null);
      })
    );
  }

  getCoverUrl(coverId: number | undefined, size: 'S' | 'M' | 'L' = 'M'): string | null {
    if (!coverId) return null;
    return `${this.COVERS_BASE}/b/id/${coverId}-${size}.jpg`;
  }

  getCoverByOlid(olid: string, size: 'S' | 'M' | 'L' = 'M'): string {
    return `${this.COVERS_BASE}/b/olid/${olid}-${size}.jpg`;
  }

  getAuthorPhoto(authorKey: string, size: 'S' | 'M' | 'L' = 'M'): string {
    if (!authorKey) return '';
    const olid = authorKey.replace('/authors/', '');
    return `${this.COVERS_BASE}/a/olid/${olid}-${size}.jpg`;
  }

  getRecommended(): Observable<Book[]> {
    return this.search('popular audiobooks', 1, 10).pipe(
      map(result => result.docs)
    );
  }

  getPopular(): Observable<Book[]> {
    return this.search('trending', 1, 10).pipe(
      map(result => result.docs)
    );
  }

  getBooksByAuthor(authorName: string): Observable<Book[]> {
    return this.search(`author:${authorName}`, 1, 10).pipe(
      map(result => result.docs)
    );
  }

  private transformToBookDetail(data: any): BookDetail {
    return {
      key: data.key || '',
      title: data.title || '',
      author_name: data.author_names || [],
      first_publish_year: data.first_publish_date ? parseInt(data.first_publish_date) : undefined,
      description: data.description?.value || data.description || '',
      subjects: data.subjects || [],
      language: data.languages?.map((l: any) => l.key) || [],
      edition_count: data.edition_count
    };
  }

  clearCache(): void {
    this.searchCache.clear();
  }
}