import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit click event', () => {
    let clicked = false;
    component.onClick.subscribe(() => {
      clicked = true;
    });
    
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    
    expect(clicked).toBe(true);
  });

  it('should have correct default values', () => {
    expect(component.type()).toBe('button');
    expect(component.variant()).toBe('primary');
    expect(component.size()).toBe('md');
    expect(component.disabled()).toBe(false);
    expect(component.loading()).toBe(false);
  });
});