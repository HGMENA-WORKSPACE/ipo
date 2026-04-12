import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { Book } from '../../models';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  const mockBook: Book = {
    key: 'OL123W',
    title: 'Test Book',
    author_name: ['Test Author'],
    cover_i: 12345,
    first_publish_year: 2020
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.book.set(mockBook);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate correct cover URL', () => {
    const url = component.coverUrl();
    expect(url).toContain('covers.openlibrary.org');
    expect(url).toContain('12345');
  });
});