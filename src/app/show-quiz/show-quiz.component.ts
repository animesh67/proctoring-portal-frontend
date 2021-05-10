import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-quiz',
  templateUrl: './show-quiz.component.html',
  styleUrls: ['./show-quiz.component.css']
})
export class ShowQuizComponent implements OnInit {
  quiz={
    subject:"Economics",
    duration:10,
    ques:[
      {
        q:"dvccx vccxvccxvccxvccx vccx vccx vccx vccxvccx v vvvccxvccxvccx  vccxvccx vccx vccx vccx vccx vccxvccxvds",
        o:["v v vccxvccxvccxvccx vccx vccx vccx vccxvccx v vvvccxvccxvccx  vccxvccx vccx vccx vccccx","opki0","oooooo",";pnoub"],
        ans:""
      },
      {
        q:"dvccx vccxvccxvccxvccx vccx vccx vccx vccxvccx v vvvccxvccxvccx  vccxvccx vccx vccx vccx vccx vccxvccxvds",
        o:["  vccxvccx vccx vccx vccccx","opki0","oooooo",";pnoub"],
        ans:""
      }
    ]
  }
  constructor() { }

  ngOnInit(): void {
  }
  submit=()=>{
    console.log(this.quiz)
  }

}
