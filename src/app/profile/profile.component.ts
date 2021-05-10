import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { LoginService } from '../services/login.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isM=this.loginService.user.isImage;
  profile: any = null;
  request = false;
  password = {
    old: "",
    new: "",
    newConfirm: "",
  }
  success = "";
  error = "";
  constructor(
    private profileService: ProfileService,
    private loginService: LoginService,
    private router:Router

  ) { }

  ngOnInit(): void {
    this.profile = Object.assign({}, this.loginService.user);
    this.profile.courses = Object.entries(this.profile.courses);
  }

  changePassword = () => {
    this.request = true;
  }
  submit = async () => {
    if (!this.profileService.passwordCheck(this.password.new)) {
      this.error = " Password should have a special character, digit , uppercase alphabet";
      return;
    }
    else if (this.password.new !== this.password.newConfirm) {
      this.error = "Passwords do not match";
      return;
    }
    let res = await this.profileService.changePassword(this.password);
    if (res.status === 400) {
      this.error = "Old password Incorrect";
      return;
    }
    this.error = "";
    this.success = "Password Changed Successfuly"
    this.request = !this.request;
    return;
  }

  uploadImage(){
    this.router.navigate(["/take-photo"])
  }

}
