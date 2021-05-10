import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router"
import { QuizService } from './quiz.service';
import * as moment from "moment-timezone"
import { InfoDialog } from '../services/infoDialog';
import { LoginService } from '../services/login.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { enums } from '../enums/enums';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  future=true;
  past=false;
  quiz: any = [];
  heading: string = "";
  teacher = false;
  student=true;

  constructor(
    private router: Router,
    private quizService: QuizService,
    private route: ActivatedRoute,
    private dialog: InfoDialog,
    private loginService: LoginService,
    private spinner: NgxSpinnerService,
    private http:HttpClient
    ) { }

  async ngOnInit(): Promise<void> {
    if (this.loginService.check()) {
      console.log("yes")
      this.loginService.ifInLocal();
    }
    this.teacher = this.loginService.user.access === "teacher";
    this.student = this.loginService.user.access === "student";

    this.route.params.subscribe(async (params) => {
      if(params['details']==="result"){
        this.heading="Results";
      }
      else
      this.heading = params['details'] === "upcoming-quiz" ? "Upcoming Quizzes" : "Past Quizzes";
      this.future=this.heading==="Upcoming Quizzes";
      this.past=this.heading==="Past Quizzes";
      this.spinner.show()
      this.quiz = await this.quizService.getList(this.heading);
     
      this.spinner.hide()
    })



  }
  start = (i: any) => {
    this.router.navigate(["quizDisplay", `${i.subject_name}`, `${i.id}`]);
  }
  del = async (i,index) => {
    console.log(index)
    if (this.heading !== "Upcoming Quizzes") {
      this.dialog.display("Error", "Cannot delete a Past Quiz");
      return;
    }
    this.spinner.show()
    this.http.delete(enums.getQuiz,{params:{id:i.id}}).toPromise();
    delete this.quiz[index]
    this.spinner.hide()
  }

  results=(i)=>{
    this.router.navigate(["quizResults", `${i.subject_name}`, `${i.id}`]);
  }
  preview(i){
    this.router.navigate(["quizDisplay", `${i.subject_name}`, `${i.id}`]);

  }
}
