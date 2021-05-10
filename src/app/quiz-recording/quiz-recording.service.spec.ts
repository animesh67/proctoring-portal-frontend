import { TestBed } from '@angular/core/testing';

import { QuizRecordingService } from './quiz-recording.service';

describe('QuizRecordingService', () => {
  let service: QuizRecordingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizRecordingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
