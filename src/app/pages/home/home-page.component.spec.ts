import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePageComponent } from './home-page.component';
import { BookService } from '../../services/book.service';
import { UserService } from '../../services/user.service';
import { of } from 'rxjs';
import { Book } from '../../models';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  const mockBooks: Book[] = [
    { key: 'OL1W', title: 'Book 1', author_name: ['Author 1'], cover_i: 1 },
    { key: 'OL2W', title: 'Book 2', author_name: ['Author 2'], cover_i: 2 }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageComponent],
      providers: [
        { provide: BookService, useValue: { 
          getRecommended: () => of(mockBooks),
          getPopular: () => of(mockBooks)
        }},
        { provide: UserService, useValue: { setLanguage: () => {} } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});