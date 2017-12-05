import { TestBed, inject } from '@angular/core/testing';

import { FacturacionService } from './facturacion.service';

describe('FacturacionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FacturacionService]
    });
  });

  it('should be created', inject([FacturacionService], (service: FacturacionService) => {
    expect(service).toBeTruthy();
  }));
});
