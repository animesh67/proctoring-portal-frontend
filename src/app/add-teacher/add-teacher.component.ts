import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { enums } from "../enums/enums"
import { LoginService } from '../services/login.service';
@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {

  token = this.loginService.check();
  
  uploader: FileUploader = new FileUploader({ url: `${enums.registerUsers}`, authTokenHeader: "bearertoken", authToken: this.token });

  constructor(private loginService:LoginService) { }
  ngOnInit(): void {
  }
}
