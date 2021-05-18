import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { InfoDialog } from './services/infoDialog';
import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root'
})
export class ImageGuardGuard implements CanActivate {

  constructor(private loginService: LoginService, private dialog: InfoDialog) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.loginService.user.isImage === false && this.loginService.user.access === "student" && this.loginService.imaa===false) {
      this.dialog.display("Info", "Upload you image in profile tab, else you wont be able to take a quiz");
      return false;
    }
    return true;
  }

}
