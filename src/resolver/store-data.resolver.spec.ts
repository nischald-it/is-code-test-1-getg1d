import { TestBed } from '@angular/core/testing';

import { StoreDataResolver } from './store-data.resolver';

describe('StoreDataResolver', () => {
  let resolver: StoreDataResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(StoreDataResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
