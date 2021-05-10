import { TestBed } from '@angular/core/testing';

import { ImageGuardGuard } from './image-guard.guard';

describe('ImageGuardGuard', () => {
  let guard: ImageGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ImageGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
