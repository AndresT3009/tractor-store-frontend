import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HTTP_ERROR_EVENT } from 'shared-catalog';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    // El tema se aplica a document.documentElement (compartido por toda la página, no solo por
    // este fixture) — sin limpiarlo, un test que deja data-theme="dark" se filtraría al resto.
    document.documentElement.removeAttribute('data-theme');
    localStorage.clear();
  });

  it('shows no error banner by default', () => {
    expect(fixture.nativeElement.querySelector('[data-testid="http-error-banner"]')).toBeNull();
  });

  it('shows the error banner when a cross-MFE HTTP error event fires', () => {
    window.dispatchEvent(
      new CustomEvent(HTTP_ERROR_EVENT, {
        detail: { status: 500, url: 'http://api.test/x', message: 'Internal Server Error' },
      })
    );
    fixture.detectChanges();

    const banner = fixture.nativeElement.querySelector('[data-testid="http-error-banner"]');
    expect(banner?.textContent).toContain('500');
  });

  it('dismisses the banner on click', () => {
    window.dispatchEvent(
      new CustomEvent(HTTP_ERROR_EVENT, {
        detail: { status: 500, url: 'http://api.test/x', message: 'Internal Server Error' },
      })
    );
    fixture.detectChanges();

    (
      fixture.nativeElement.querySelector(
        '[data-testid="http-error-banner"] button'
      ) as HTMLButtonElement
    ).click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[data-testid="http-error-banner"]')).toBeNull();
  });

  it('toggles data-theme on the document and persists it', () => {
    const toggle = fixture.nativeElement.querySelector(
      '[data-testid="theme-toggle"]'
    ) as HTMLButtonElement;

    toggle.click();
    fixture.detectChanges();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('tractor-store:theme')).toBe('dark');

    toggle.click();
    fixture.detectChanges();
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });
});
