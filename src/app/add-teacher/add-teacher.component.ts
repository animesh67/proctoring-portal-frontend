import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { enums } from "../enums/enums"
import { LoginService } from '../services/login.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {
  modalRef: any;
  courseRef;
  token = this.loginService.check();
  public user = {
    name: null,
    email: null,
    sid_tid: null,
    access: null,
    courses: null
  };
  public course={
    course_name:null,
    courseId:null
  }


  uploader: FileUploader = new FileUploader({ url: `${enums.registerUsers}`, authTokenHeader: "bearertoken", authToken: this.token });

  openModal(template: any) {
    this.modalRef = this.modalService.show(template);
  }
  openMo(template: any) {
    this.courseRef = this.modalService.show(template);
  }


  constructor(
    private _snakbar:MatSnackBar,
    private http:HttpClient,
    private loginService: LoginService, private modalService: BsModalService) { }
  ngOnInit(): void {
  }
  addUser = async () => {
    const resp:any=await this.http.post(enums.addUser,this.user).toPromise().then(data=>data).catch(err=>null);
    console.log(resp)
    if(resp===null){
      this._snakbar.open("User not registered : Data invalid","Close",{duration:3000})
      return;
    }
    this._snakbar.open("User Successfully Registered","Close",{duration:3000})
  }
  addCourse=async()=>{
    console.log(this.course)
    const resp:any=await this.http.post(enums.addCourse,this.course).toPromise().then(data=>data).catch(err=>null);
    if(resp===null){
      this._snakbar.open("Course not registered : Data invalid","Close",{duration:3000})
      return;
    }
    this._snakbar.open("Course Successfully Registered","Close",{duration:3000})
  }
}
