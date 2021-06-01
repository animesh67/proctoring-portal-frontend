import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-quiz-preview',
  templateUrl: './quiz-preview.component.html',
  styleUrls: ['./quiz-preview.component.css']
})
export class QuizPreviewComponent implements OnInit {

  questions:any;
  src:string;

  constructor(public dialogRef: MatDialogRef<QuizPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel) {
    this.questions = data.questions;
    this.src=data.src;
  }

  ngOnInit() {
    console.log(this.questions.ques[0].option1)
    for(let i in this.questions.ques){
      let c= this.questions.ques[i]
      this.questions.ques[i].o=[
        this.questions.ques[i].option1,
        this.questions.ques[i].option2,
        this.questions.ques[i].option3,
        this.questions.ques[i].option4];
        if(typeof c.correct === "number")
        c.correct=this.questions.ques[i].o[c.correct-1]

    }
    
   
  }

  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }

}

export class ConfirmDialogModel {

  constructor(public questions:any,public src:string) {
  }
}

