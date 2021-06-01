import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from "@angular/router";
import { enums } from "../enums/enums"
import { VideoService } from '../video-player/video-service';
import {NgxSpinnerService} from "ngx-spinner"
import { QuizPreviewService } from '../quiz-preview/quiz-preview.service';


@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.css']
})
export class QuizResultsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator
  public searchKey: string;
  public listData = null;
  expandedElement = null;
  config: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: "right",
    verticalPosition: "top"
  };
  message = null;
  isFetching = true;
  displayedColumns = ["name", "id", "marks", "actions"];
  constructor(private route:ActivatedRoute,private http: HttpClient, private changeRef: ChangeDetectorRef, private snackBar: MatSnackBar,
    private videoService:VideoService,private router:Router,private spinner:NgxSpinnerService,
    private quizPreview:QuizPreviewService) {
    this.details={
      subject:route.snapshot.params.subject,
      quizId:route.snapshot.params.id,
    }
  }
  details={
    subject:null,
    quizId:null
  }
  info={
   noOfQues:"",
   min:"",
   max:"",
   mean:":",
   std:"",
   userAppeared:""
  }

  async ngOnInit(): Promise<void> {
    this.spinner.show();
    let data=await this.http.get(enums.quizResult,{params:{subject:this.details.subject,id:this.details.quizId}}).
    toPromise().then(data=>data).catch(err=>{this.snackBar.open("Error in Getting Results", '', this.config); return null});
    data=data.data
    if(data===null){
      this.snackBar.open("Results are not compiled Yet, Try Again",'',this.config);
      this.router.navigate(["quiz","result"]);
      this.spinner.hide()
      return;
    }
    this.spinner.hide()
    this.info=data.head;
    this.listData = new MatTableDataSource(data.data);
    this.changeRef.detectChanges();
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;
    this.changeRef.detectChanges();

    this.isFetching = false
   
  }
  onSearchClick() {
    this.searchKey = "";
  }
  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  video=(e)=>{
    this.videoService.display(`http://localhost:3000/video/${e.sid}/${this.details.quizId}`,[
      "f","r","f","r","f","r","f","r","f","r","f","r","f","r","f","r","f","r",
    ])
  }
  response=async (e)=>{
    let questions;
    questions=await this.http.get(enums.quizPreview,{params:{role:"student",sid:e.sid,id:this.details.quizId}}).toPromise().then(data=>data).catch(err=>null);
    this.quizPreview.display({subject:this.details.subject,ques:questions});
  }
   release=async()=>{
   let p= await this.http.get(enums.releaseResults,{params:{id:this.details.quizId}}).toPromise()
  }

}
