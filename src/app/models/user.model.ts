export interface User {
  id: string;
  name: string;
  createdAt: Date;
  favorites: string[];
  preferredLanguage: 'es' | 'en';
  readingPosition: Record<string, number>;
}
