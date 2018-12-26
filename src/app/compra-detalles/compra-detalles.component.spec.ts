import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraDetallesComponent } from './compra-detalles.component';

describe('CompraDetallesComponent', () => {
  let component: CompraDetallesComponent;
  let fixture: ComponentFixture<CompraDetallesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompraDetallesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompraDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
