import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmDialogComponent, DownloadProgressComponent } from '../../components';
import { Download } from '../../models';
import { DownloadService, ToastService } from '../../services';

@Component({
  selector: 'downloads-page',
  styleUrl: './downloads-page.component.css',
  templateUrl: './downloads-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    ConfirmDialogComponent,
    DownloadProgressComponent,
  ],
})
export class DownloadsPageComponent {
  private readonly toastService = inject(ToastService);
  private readonly downloadService = inject(DownloadService);
  //
  protected readonly showCancelConfirm = signal(false);
  protected readonly downloadToCancel = signal<Download | null>(null);
  protected readonly activeTab = signal<'in_progress' | 'completed'>('in_progress');
  //
  protected readonly completed = this.downloadService.completed;
  protected readonly inProgress = this.downloadService.inProgress;
  readonly cancelMessage = computed(() => {
    const download = this.downloadToCancel();
    if (!download) return '';
    return `downloads.confirmCancelMessage | translate: { title: download.bookTitle, progress: Math.round(download.progress) }`;
  });
  /**
   *
   * @param bytes
   * @returns
   */
  protected formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  protected pause(id: string): void {
    this.downloadService.pauseDownload(id);
  }

  protected resume(id: string): void {
    this.downloadService.resumeDownload(id);
  }

  protected confirmCancel(download: Download): void {
    this.downloadToCancel.set(download);
    this.showCancelConfirm.set(true);
  }

  protected cancelDownload(): void {
    const download = this.downloadToCancel();
    if (download) {
      this.downloadService.cancelDownload(download.id);
      this.toastService.success('Descarga cancelada');
    }
    this.showCancelConfirm.set(false);
    this.downloadToCancel.set(null);
  }

  protected deleteDownload(id: string): void {
    this.downloadService.deleteDownload(id);
    this.toastService.success('Descarga eliminada');
  }

  protected openDownload(download: Download): void {
    this.toastService.info('Abriendo archivo...');
  }

  protected readonly Math = Math;
}
