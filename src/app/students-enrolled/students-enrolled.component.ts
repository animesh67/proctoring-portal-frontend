import { Component, OnInit, ViewChild, } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from "ngx-spinner"
import { LoginService } from '../services/login.service';
import { StudentService } from './strudent.service';
import { QuizPreviewService } from "../quiz-preview/quiz-preview.service"

@Component({
  selector: 'app-students-enrolled',
  templateUrl: './students-enrolled.component.html',
  styleUrls: ['./students-enrolled.component.css']
})
export class StudentsEnrolledComponent implements OnInit {

  constructor(private loginService: LoginService, private service: StudentService, private spinner: NgxSpinnerService,
    private quzPr: QuizPreviewService) { }
  @ViewChild(MatSort) sort: MatSort;
  public searchKey: string;
  public listData = null;
  expandedElement = null;
  message = null;
  isFetching = true;
  displayedColumns = ['name', 'id', 'email', "picture"];
  students: [{ name: string, id: number, email: string }?] | any = []
  refresh = false;
  subjects: string[] = [];
  subjectName: string = "";
  ngOnInit(): void {
    for (let i in this.loginService.user.courses) {
      this.subjects.push(this.loginService.user.courses[i]);
    }
  }


  onRefresh = async () => {
    this.spinner.show();
    this.students = await this.service.getList(this.subjectName) as [{ name: string, id: number, email: string }];
    this.spinner.hide()
    this.refresh = true;
    this.students = new MatTableDataSource(this.students) as any;
    this.students.sort = this.sort;

    this.isFetching = false
  }
  onSearchClick() {
    this.searchKey = "";
  }
  applyFilter() {
    this.students.filter = this.searchKey.trim().toLowerCase();
  }
  seePhoto = async (e) => {
    let pic = await this.service.getimg(e);
    this.quzPr.display("dds", pic);
  }
  async delPhoto(e){
    let pic=await this.service.delPic(e);
  }


}
