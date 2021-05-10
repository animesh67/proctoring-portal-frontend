import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { LoginService } from "../services/login.service"
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { NgxSpinnerService } from "ngx-spinner"
import { HttpClient } from '@angular/common/http';
import { enums } from '../enums/enums';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({});
  isSubmitted = false;
  alertMessage: string = "";
  type: string = "";
  socialUser: SocialUser = new SocialUser();
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private socialAuthService: SocialAuthService,
    private spinner: NgxSpinnerService,
    private http: HttpClient
  ) { }

  pswdValidator = (control: FormControl) => {
    const password = control.value;
    return password.length >= 7 ? null : { pswd: 'invalid' };
  }


  ngOnInit(): void {
    if (this.loginService.check()) {
      console.log("yes")
      this.loginService.ifInLocal();
    }
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, this.pswdValidator]],
      captcha: ['', Validators.required]
    });

    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.googleLogin(user);
    });

  }
  ngAfterView() {

  }

  get formControls() {
    return this.loginForm.controls;
  }
  googleLogin = async (user: { email: string, authToken: string }) => {
    try {
      this.spinner.show();
      await this.loginService.logIn({
        "email": user.email, "password": "none", "googleToken": user.authToken
      });
      this.spinner.hide();
      this.type = 'success';
      this.alertMessage = 'User logged in successfully';
    } catch {
      this.type = 'error';
      this.alertMessage = 'Error in log in';
      this.spinner.hide();
    }
  }

  async login() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    try {
      this.spinner.show();
      await this.loginService.logIn(this.loginForm.value);
      this.type = 'success';
      this.alertMessage = 'User logged in successfully';
      this.spinner.hide();
    } catch {
      this.spinner.hide();
      this.type = 'error';
      this.alertMessage = 'Error in log in';
    }
  }
  forgot = async () => {
    if (this.formControls.email.value === "") {
      this.type = 'error';
      this.alertMessage = 'Enter Email Id';
      return;

    }
    if( this.formControls.captcha.value===""){
      this.type = 'error';
      this.alertMessage = 'Please Fill the captcha';
      return;
    }
    await this.http.post(enums.forgot, {
      email: this.formControls.email.value
    }).toPromise().then(data => {
      this.type = 'success';
      this.alertMessage = 'Check Your Email';
      return data
    }).catch(err => {
      console.log(err)
      this.type = 'error';
      this.alertMessage = 'Error in Sending Email';
      return err;
    });


  }


  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logOut(): void {
    this.socialAuthService.signOut();
  }

  public resolved(captchaResponse: any): void {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  public onError(errorDetails: any): void {
    console.log(`reCAPTCHA error encountered; details:`, errorDetails);
  }


}