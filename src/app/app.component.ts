import { Component, Inject, } from "@angular/core";
import { DOCUMENT } from '@angular/common';
import { InfoDialog } from "./services/infoDialog"
import { NgxSpinnerService } from "ngx-spinner"
import { LoginService } from "./services/login.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  ngOnInit() {
  }
  



  constructor(@Inject(DOCUMENT) private document: Document,
    public info: InfoDialog,
    private spinner: NgxSpinnerService,
    private loginService: LoginService) {
    
    // window.addEventListener('blur', () => {
    //   info.display("Tab Switched", "Switching tab one more time will lead to auto submission")
    // });

  }
  title = 'vi-frontend';


}
