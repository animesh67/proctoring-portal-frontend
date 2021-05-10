import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuizRecordingService } from '../quiz-recording.service';
import { Subscription, interval } from 'rxjs';
@Component({
  selector: 'app-quiz-recording',
  templateUrl: './quiz-recording.component.html',
  styleUrls: ['./quiz-recording.component.css']
})
export class QuizRecordingComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;
  mins: number = 5;
  sec: number = 0;

  constructor(public quizRecordingService:QuizRecordingService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.subscription = interval(1000)
      .subscribe(x => {
        if (this.sec == 0) {
          this.mins--;
          this.sec = 59;
        }
        else {
          this.sec--;
        }
      });

  }
  enableMicWebCamAccess():any{
    this.quizRecordingService.enableMicWebCamAccess();
  }
  startQuiz():any{
    this.quizRecordingService.startRecording();
  }
}
