import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookPageComponent } from './book-page.component';
import { BookService } from '../../services/book.service';
import { DownloadService } from '../../services/download.service';
import { UserService } from '../../services/user.service';
import { of } from 'rxjs';
import { BookDetail } from '../../models';

describe('BookPageComponent', () => {
  let component: BookPageComponent;
  let fixture: ComponentFixture<BookPageComponent>;

  const mockBookDetail: BookDetail = {
    key: 'OL123W',
    title: 'Test Book',
    author_name: ['Test Author'],
    first_publish_year: 2020,
    cover_i: 12345,
    subjects: ['Fiction'],
    language: ['eng']
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookPageComponent],
      providers: [
        { provide: BookService, useValue: { getBookById: () => of(mockBookDetail), getBooksByAuthor: () => of([]) } },
        { provide: DownloadService, useValue: { addDownload: () => {} } },
        { provide: UserService, useValue: { getReadingPosition: () => 0, updateReadingPosition: () => {} } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BookPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});