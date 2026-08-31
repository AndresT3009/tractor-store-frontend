import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TsDesignSystemComponent } from './ts-design-system.component';

describe('TsDesignSystemComponent', () => {
  let component: TsDesignSystemComponent;
  let fixture: ComponentFixture<TsDesignSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TsDesignSystemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TsDesignSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
