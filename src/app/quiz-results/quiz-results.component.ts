import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from "@angular/router";
import { enums } from "../enums/enums"
import { VideoService } from '../video-player/video-service';


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
    private videoService:VideoService) {
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
    high:"dvs",
    low:"fbdfb",
    no:"d",
    avg:"sd",
    std:"fgs",
    ap:"d"
  }

  ngOnInit(): void {
    this.listData = new MatTableDataSource([{ name: "ani", id: 1212, marks: 2 }]);
    this.changeRef.detectChanges();
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;
    this.changeRef.detectChanges();

    this.isFetching = false
    // this.http.get(enums.quizResult).subscribe(response => {

    // }, error => this.snackBar.open("Error in Getting Results", '', this.config)
    // );
  }
  onSearchClick() {
    this.searchKey = "";
  }
  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  video=(e)=>{
    this.videoService.display("http://localhost:3000/video/21/21",[
      "f","r","f","r","f","r","f","r","f","r","f","r","f","r","f","r","f","r",
    ])
  }
  response=(e)=>{

  }
  release=()=>{

  }

}
