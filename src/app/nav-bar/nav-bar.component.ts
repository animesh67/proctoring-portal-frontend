import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {LoginService} from '../services/login.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
  .observe(Breakpoints.Handset)
  .pipe(
    map((result) => result.matches),
    shareReplay()
  );
  isLogged=false;
  isTeacher=false;
  isAdmin=false;

  constructor(
    private router:Router,
    private breakpointObserver: BreakpointObserver,
    private loginService:LoginService
  ){ 
    this.isLogged=this.loginService.isLoggedIn;
  }

  logOut = (): void => {
    this.router.navigate(['login'])
    this.loginService.logOut();
  };

  ngOnInit(): void {
    this.loginService.isLogged.subscribe(msg => this.isLogged = msg);
    this.loginService.isTeacher.subscribe(msg => this.isTeacher = msg);
    this.loginService.isAdmin.subscribe(msg => this.isAdmin = msg);
  }

}
