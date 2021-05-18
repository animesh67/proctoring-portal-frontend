import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProfileComponent } from './profile/profile.component';
import { QuizRecordingComponent } from './quiz-recording/quiz-recording/quiz-recording.component';
import { QuizUploadComponent } from './quiz-upload/quiz-upload.component';
import { QuizComponent } from "./quiz/quiz.component"
import { ShowQuizComponent } from './show-quiz/show-quiz.component';
import { StudentsEnrolledComponent } from './students-enrolled/students-enrolled.component';
import { TakePhotoComponent } from './take-photo/take-photo.component';
import { WorksComponent } from './works/works.component';
import { ImageGuardGuard } from "./image-guard.guard"
import { QuizResultsComponent } from './quiz-results/quiz-results.component';
import { ProctoringComponent } from './proctoring/proctoring.component';
import { RoomComponent } from './room/room.component';
const routes: Routes = [
  {
    path: "",
    component: NavBarComponent,
    children: [{
      component: LoginComponent,
      path: "",
    },
    {
      component: LoginComponent,
      path: "login",
    },
    {
      path: "students",
      component: StudentsEnrolledComponent,
      canActivate: [AuthGuardGuard]
    },
    {
      path: "quiz-upload",
      component: QuizUploadComponent,
      canActivate: [AuthGuardGuard]
    },
    {
      path: "works",
      component: WorksComponent,
    },
    {
      path: "take-photo",
      component: TakePhotoComponent,
      canActivate: [AuthGuardGuard]
    },
    {
      path: "quiz/:details",
      component: QuizComponent,
      canActivate: [AuthGuardGuard, ImageGuardGuard]
    },
    {
      component: ProfileComponent,
      path: "profile",
      canActivate: [AuthGuardGuard]
    },
    {
      component: AddTeacherComponent,
      path: "add-teacher",
      canActivate: [AuthGuardGuard]
    },
    {
      path: "proctoring",
      component: ProctoringComponent,
      canActivate: [AuthGuardGuard]
    },
    ]
  },
  {
    path: "quiz-display",
    component: QuizRecordingComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: "quizDisplay/:subject/:id",
    component: ShowQuizComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: "quizResults/:subject/:id",
    component: QuizResultsComponent,
    canActivate: [AuthGuardGuard]
  },

  {
    path: "proctoring/:room/:id",
    component: RoomComponent,
    // canActivate: [AuthGuardGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
