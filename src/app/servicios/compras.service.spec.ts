import { TestBed, inject } from '@angular/core/testing';

import { ComprasService } from './compras.service';

describe('ComprasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComprasService]
    });
  });

  it('should be created', inject([ComprasService], (service: ComprasService) => {
    expect(service).toBeTruthy();
  }));
});
