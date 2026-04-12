export interface User {
  id: string;
  name: string;
  preferredLanguage: 'es' | 'en';
  readingPosition: Record<string, number>;
  favorites: string[];
  createdAt: Date;
}

export const DEFAULT_USER: User = {
  id: 'harley',
  name: 'Harley',
  preferredLanguage: 'es',
  readingPosition: {},
  favorites: [],
  createdAt: new Date()
};