import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturacionComponent } from './facturacion.component';

describe('FacturacionComponent', () => {
  let component: FacturacionComponent;
  let fixture: ComponentFixture<FacturacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
