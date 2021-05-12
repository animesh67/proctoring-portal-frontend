import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Router } from "@angular/router";
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-proctoring',
  templateUrl: './proctoring.component.html',
  styleUrls: ['./proctoring.component.scss']
})
export class ProctoringComponent implements OnInit {


  constructor(private router: Router,private loginServixe:LoginService) {
  }
  pressed=false;
  isStudent=this.loginServixe.user.access==="student";
  id=null;
  uuid=null

  ngOnInit(): void {
    this.loginServixe.ifInLocal()
  }

  generate=()=>{
    this.id=uuidv4();
  }

  join = () => {
    if(this.id){
      this.uuid=this.id;
    }
    this.router.navigate(['proctoring','joinroom', this.uuid]);
  }

}
