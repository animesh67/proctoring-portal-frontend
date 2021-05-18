import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import {ConfirmDialogModel,QuizPreviewComponent} from "./quiz-preview.component"

@Injectable({
    providedIn: 'root',
  })
export class QuizPreviewService {
  constructor(private dialog: MatDialog) {}
  display=(questions:any,src=null)=>{
    const dialogData=new ConfirmDialogModel(questions,src);
    this.dialog.open(QuizPreviewComponent,{
      data:dialogData
    });
  }
}
