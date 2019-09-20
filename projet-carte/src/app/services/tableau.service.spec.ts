import { TestBed } from '@angular/core/testing';

import { TableauService } from './tableau.service';

describe('TableauService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TableauService = TestBed.get(TableauService);
    expect(service).toBeTruthy();
  });
});
