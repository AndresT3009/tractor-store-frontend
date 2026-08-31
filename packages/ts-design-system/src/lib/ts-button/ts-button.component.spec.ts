import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TsButtonComponent } from './ts-button.component';

describe('TsButtonComponent', () => {
  let fixture: ComponentFixture<TsButtonComponent>;

  function queryButton(): HTMLButtonElement {
    const button = (fixture.nativeElement as HTMLElement).shadowRoot?.querySelector('button');
    if (!button) {
      throw new Error('Expected <button> inside the shadow root');
    }
    return button as HTMLButtonElement;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TsButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TsButtonComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should attach a real Shadow DOM root (ViewEncapsulation.ShadowDom)', () => {
    expect((fixture.nativeElement as HTMLElement).shadowRoot).toBeTruthy();
  });

  // El contenido real de los estilos (que usen var(--button-bg) y no un color fijo) se verifica
  // con Playwright en shell-e2e, no aquí: jsdom no implementa ni <style> inyectado ni
  // adoptedStyleSheets dentro de un shadow root, así que no hay forma confiable de leer CSS real
  // desde un test unitario para un componente ShadowDom.

  it('should emit press when clicked', () => {
    const pressed = jest.fn();
    fixture.componentInstance.press.subscribe(pressed);

    queryButton().click();

    expect(pressed).toHaveBeenCalledTimes(1);
  });

  it('should disable the native button when disabled is true', () => {
    fixture.componentInstance.disabled = true;
    fixture.detectChanges();

    expect(queryButton().disabled).toBe(true);
  });

  it('should apply the danger modifier class for the danger variant', () => {
    fixture.componentInstance.variant = 'danger';
    fixture.detectChanges();

    expect(queryButton().classList.contains('ts-button--danger')).toBe(true);
  });
});
