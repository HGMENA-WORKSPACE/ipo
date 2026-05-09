export interface Book {
  key: string;
  title: string;
  author_name: string[];
  first_publish_year?: number;
  cover_i?: number;
  author_key?: string[];
  ia?: string[];
  language?: string[];
  edition_count?: number;
  public_scan_b?: boolean;
  has_fulltext?: boolean;
}

export interface BookDetail extends Book {
  description?: string;
  subjects?: string[];
  publishers?: string[];
  number_of_pages?: number;
  genres?: string[];
  duration?: string;
  narrator?: string;
  available_formats?: string[];
}

export interface SearchResult {
  start: number;
  num_found: number;
  docs: Book[];
}

export interface BookFilters {
  genre?: string;
  language?: string;
  duration?: number;
}
