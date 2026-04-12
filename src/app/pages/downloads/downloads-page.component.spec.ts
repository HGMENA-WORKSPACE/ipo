import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DownloadsPageComponent } from './downloads-page.component';
import { DownloadService } from '../../services/download.service';
import { ToastService } from '../../services/toast.service';
import { signal } from '@angular/core';
import { Download } from '../../models';

describe('DownloadsPageComponent', () => {
  let component: DownloadsPageComponent;
  let fixture: ComponentFixture<DownloadsPageComponent>;

  const mockDownloads: Download[] = [
    {
      id: '1',
      bookId: 'OL1W',
      bookTitle: 'Test Book',
      authorName: 'Author',
      format: 'mp3',
      status: 'in_progress',
      progress: 50,
      totalBytes: 1000000,
      downloadedBytes: 500000,
      startedAt: new Date()
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadsPageComponent],
      providers: [
        { provide: DownloadService, useValue: { 
          inProgress: signal(mockDownloads),
          completed: signal([]),
          pauseDownload: () => {},
          resumeDownload: () => {},
          cancelDownload: () => {},
          deleteDownload: () => {}
        }},
        { provide: ToastService, useValue: { success: () => {}, info: () => {} } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DownloadsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});