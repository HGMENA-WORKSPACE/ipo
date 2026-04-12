export interface Download {
  id: string;
  bookId: string;
  bookTitle: string;
  authorName: string;
  coverUrl?: string;
  format: 'mp3' | 'ogg';
  status: 'pending' | 'in_progress' | 'paused' | 'completed' | 'failed';
  progress: number;
  totalBytes: number;
  downloadedBytes: number;
  startedAt: Date;
  completedAt?: Date;
}

export interface DownloadState {
  inProgress: Download[];
  completed: Download[];
}