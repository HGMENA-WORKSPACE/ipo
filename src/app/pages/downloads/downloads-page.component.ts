import { Component, signal, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProgressComponent } from '../../components/progress/progress.component';
import { ConfirmDialogComponent } from '../../components/modal/confirm-dialog.component';
import { DownloadService, ToastService } from '../../services';
import { Download } from '../../models';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-downloads-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ProgressComponent, ConfirmDialogComponent, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './downloads-page.component.html',
  styleUrl: './downloads-page.component.css'
})
export class DownloadsPageComponent {
  private downloadService = inject(DownloadService);
  private toastService = inject(ToastService);

  activeTab = signal<'in_progress' | 'completed'>('in_progress');
  showCancelConfirm = signal(false);
  downloadToCancel = signal<Download | null>(null);

  inProgress = this.downloadService.inProgress;
  completed = this.downloadService.completed;

  readonly cancelMessage = computed(() => {
    const download = this.downloadToCancel();
    if (!download) return '';
    return `downloads.confirmCancelMessage | translate: { title: download.bookTitle, progress: Math.round(download.progress) }`;
  });

  formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  pause(id: string): void {
    this.downloadService.pauseDownload(id);
  }

  resume(id: string): void {
    this.downloadService.resumeDownload(id);
  }

  confirmCancel(download: Download): void {
    this.downloadToCancel.set(download);
    this.showCancelConfirm.set(true);
  }

  cancelDownload(): void {
    const download = this.downloadToCancel();
    if (download) {
      this.downloadService.cancelDownload(download.id);
      this.toastService.success('Descarga cancelada');
    }
    this.showCancelConfirm.set(false);
    this.downloadToCancel.set(null);
  }

  deleteDownload(id: string): void {
    this.downloadService.deleteDownload(id);
    this.toastService.success('Descarga eliminada');
  }

  openDownload(download: Download): void {
    this.toastService.info('Abriendo archivo...');
  }

  protected readonly Math = Math;
}