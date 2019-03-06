import { TestBed, inject } from '@angular/core/testing';

import { VentasService } from './ventas.service';

describe('FacturacionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VentasService]
    });
  });

  it('should be created', inject([VentasService], (service: VentasService) => {
    expect(service).toBeTruthy();
  }));
});
