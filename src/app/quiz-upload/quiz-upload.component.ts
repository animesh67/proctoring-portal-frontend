import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { QuizUploadService } from './quiz.upload.service';

interface Quiz {
  ques: string,
  option1: string,
  option2: string,
  option3: string,
  option4: string,
  correct: number | null,
}

@Component({
  selector: 'app-quiz-upload',
  templateUrl: './quiz-upload.component.html',
  styleUrls: ['./quiz-upload.component.css']
})
export class QuizUploadComponent implements OnInit {
  subjects: string[] = [];
  quiz:
  any
    = {
      googleForm:"",
      subjectName: "",
      questions: [],
      duration: 0,
      date: null,
    }

  isSubmitted = false;
  isWrong = false;
  constructor(private quizUploadS: QuizUploadService,private loginService:LoginService) { }

  async ngOnInit(): Promise<void> {
    for (let i in this.loginService.user.courses){
      this.subjects.push(this.loginService.user.courses[i]);
    }

  }
  quizUpload = async () => {
    this.isSubmitted = true;
    if (this.quiz.subjectName === "" ||
      this.quiz.duration === 0 || this.quiz.date === null) {
      this.isWrong = true;
      return;
    }
    this.isWrong = false;
    if(this.quiz.googleform!==""){
      this.quiz.type="googleForm"
    }
    console.log(this.quiz);
    const res = await this.quizUploadS.upload(this.quiz);

  }

  addQues = () => {
    this.quiz.questions.push({
      ques: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      correct: null,
    });
  }
  del = (i: number) => {
    this.quiz.questions.splice(i, 1);
  }

}
