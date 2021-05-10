import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { QuizUploadComponent } from './quiz-upload/quiz-upload.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizRecordingModule } from './quiz-recording/quiz-recording.module';
import { ShowQuizComponent } from './show-quiz/show-quiz.component';
import { ProfileComponent } from './profile/profile.component';
import { Interceptor } from './interceptor.interceptor';
import { InfoDialogComponent } from './confirm-dialog/info-dialog.component';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MaterialModule } from "./material-modules";
import { StudentsEnrolledComponent } from './students-enrolled/students-enrolled.component';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { WorksComponent } from './works/works.component';
import { TakePhotoComponent } from './take-photo/take-photo.component';
import { QuizResultsComponent } from './quiz-results/quiz-results.component';
import { LiveProctoringComponent } from './live-proctoring-module/live-proctoring/live-proctoring.component';
import { VideoPlayerComponent } from './video-player/video-player.component'
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    QuizUploadComponent,
    QuizComponent,
    ShowQuizComponent,
    ProfileComponent,
    StudentsEnrolledComponent,
    AddTeacherComponent,
    WorksComponent,
    TakePhotoComponent,
    QuizResultsComponent,
    LiveProctoringComponent,
    VideoPlayerComponent,

  ],
  imports: [
    MaterialModule,
    BsDatepickerModule.forRoot(),
    SocialLoginModule,
    QuizRecordingModule,
  ],
  entryComponents: [
    InfoDialogComponent,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '732178960610-gta11o67jstmsc0e3055q34f1ba30aim'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    },
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }