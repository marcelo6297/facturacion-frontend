import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosDetailComponent } from './productos-detail.component';

describe('ProductosDetailComponent', () => {
  let component: ProductosDetailComponent;
  let fixture: ComponentFixture<ProductosDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductosDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
