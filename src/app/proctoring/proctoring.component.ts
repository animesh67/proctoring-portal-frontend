import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Router } from "@angular/router";
import { LoginService } from '../services/login.service';
import { HttpClient } from '@angular/common/http';
import { enums } from '../enums/enums';

@Component({
  selector: 'app-proctoring',
  templateUrl: './proctoring.component.html',
  styleUrls: ['./proctoring.component.scss']
})
export class ProctoringComponent implements OnInit {


  constructor(private router: Router, private loginServixe: LoginService,
    private http: HttpClient) {
  }
  pressed = false;
  isStudent;
  id = null;
  uuid = null;
  list: any = []

  async ngOnInit(): Promise<void> {
    this.loginServixe.ifInLocal()
    this.isStudent = this.loginServixe.user.access === "student";
    this.list = await this.http.get(enums.postuuid).toPromise();
    console.log(this.list)
    this.list = Object.entries(this.list)
  }

  generate = () => {
    this.id = uuidv4();
  }

  join = async () => {
    if (this.id) {
      this.uuid = this.id;
    }
    if (!this.isStudent) {
      let dp = await this.http.post(enums.postuuid, { uuid: this.id }).toPromise();
    }
   
    this.router.navigate(['proctoring', 'room', this.uuid]);
  }


  next(p) {
    this.router.navigate(['proctoring', 'room', p[1]]);
  }

}
