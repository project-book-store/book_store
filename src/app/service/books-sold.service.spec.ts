import { TestBed } from '@angular/core/testing';

import { BooksSoldService } from './books-sold.service';

describe('BooksSoldService', () => {
  let service: BooksSoldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BooksSoldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
