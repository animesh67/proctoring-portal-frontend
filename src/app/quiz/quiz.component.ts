import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router"
import { QuizService } from './quiz.service';
import * as moment from "moment-timezone"
import { InfoDialog } from '../services/infoDialog';
import { LoginService } from '../services/login.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { enums } from '../enums/enums';
import{QuizPreviewService} from "../quiz-preview/quiz-preview.service"
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  future = true;
  past = false;
  quiz: any = [];
  heading: string = "";
  teacher = false;
  student = true;

  constructor(
    private snak:MatSnackBar,
    private router: Router,
    private quizService: QuizService,
    private route: ActivatedRoute,
    private dialog: InfoDialog,
    private loginService: LoginService,
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private quizPreview:QuizPreviewService
  ) { }

  async ngOnInit(): Promise<void> {
    if (this.loginService.check()) {
      console.log("yes")
      this.loginService.ifInLocal();
    }
    this.teacher = this.loginService.user.access === "teacher";
    this.student = this.loginService.user.access === "student";

    this.route.params.subscribe(async (params) => {
      if (params['details'] === "result") {
        this.heading = "Results";
      }
      else
        this.heading = params['details'] === "upcoming-quiz" ? "Upcoming Quizzes" : "Past Quizzes";
      this.future = this.heading === "Upcoming Quizzes";
      this.past = this.heading === "Past Quizzes";
      this.spinner.show()
      this.quiz = await this.quizService.getList(this.heading);

      this.spinner.hide()
    })



  }
  start = (i: any) => {
    this.router.navigate(["quizDisplay", `${i.subject_name}`, `${i.id}`]);
  }
  del = async (i, index) => {
    console.log(index)
    if (this.heading !== "Upcoming Quizzes") {
      this.dialog.display("Error", "Cannot delete a Past Quiz");
      return;
    }
    this.spinner.show()
    this.http.delete(`${enums.getQuiz}\\${i.id}`,).toPromise();
    if (this.quiz.length === 1) {
      this.quiz = []
    }
    else
      delete this.quiz[index]
    this.spinner.hide()
  }

  results = (i) => {
    this.router.navigate(["quizResults", `${i.subject_name}`, `${i.id}`]);
  }
  async preview(i) {
    let questions;
    if(this.student){
      questions=await this.http.get(enums.quizPreview,{params:{role:"student",id:i.id}}).toPromise().then(data=>data).catch(err=>null);
    }
    if(this.teacher){
      questions=await this.http.get(enums.quizPreview,{params:{role:"teacher",id:i.id}}).toPromise().then(data=>data).catch(err=>null);
    }
    console.log(questions)
    if(questions===null){
      this.snak.open("Error in displaying quiz","Close",{duration:3000})
      return;
    }
//     questions=[{q:"aaa",o:['a','b','c','d'],ans:"a"},{q:"aaa",o:['a','b','c','d'],ans:"a"}
//   ,{q:"aaa",o:['a','b','c','d'],ans:"a"}
// ,{q:"aaa",o:['a','b','c','d'],ans:"a"}]
    this.quizPreview.display({subject:i.subject_name,ques:questions});

  }
}
