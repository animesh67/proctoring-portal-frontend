import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizRecordingComponent } from './quiz-recording.component';

describe('QuizRecordingComponent', () => {
  let component: QuizRecordingComponent;
  let fixture: ComponentFixture<QuizRecordingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizRecordingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizRecordingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
