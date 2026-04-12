import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchPageComponent } from './search-page.component';
import { BookService } from '../../services/book.service';
import { of } from 'rxjs';
import { Book } from '../../models';

describe('SearchPageComponent', () => {
  let component: SearchPageComponent;
  let fixture: ComponentFixture<SearchPageComponent>;

  const mockBooks: Book[] = [
    { key: 'OL1W', title: 'Book 1', author_name: ['Author 1'], cover_i: 1 }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchPageComponent],
      providers: [
        { provide: BookService, useValue: { search: () => of({ docs: mockBooks, num_found: 1 }) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});