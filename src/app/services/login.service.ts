import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { enums } from "../enums/enums"
import { Observable, Subject } from "rxjs";
import { CookieService } from 'ngx-cookie-service';

interface USER {
    token?: string,
    name: string,
    emailId: string,
    sid_tid: string,
    access: string,
    courses: {},
    isImage: boolean
}

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    imaa=false;
    saveSession(){
        sessionStorage.setItem("user",JSON.stringify(this.user))
    }
    logOut() {
        this.isLoggedIn = false;
        this.updateStatus("none");
        sessionStorage.removeItem("user")
        sessionStorage.removeItem("jwtToken")
        this.updateStatus("none");
    }
    user: USER = { token: "", name: "", emailId: "", sid_tid: "", access: "", courses: {}, isImage: false };
    isLoggedIn = false;
    isLogged = new Subject<boolean>();
    isTeacher = new Subject<boolean>();
    isAdmin = new Subject<boolean>();


    public getLog(): Observable<boolean> {
        return this.isLogged.asObservable();
    }
    public getAccess(): Observable<boolean> {
        return this.isTeacher.asObservable();
    }
    public updateStatus(access: string): void {
        this.isLogged.next(this.isLoggedIn);
        this.isTeacher.next(access === "teacher");
        this.isAdmin.next(access === "admin");
    }

    ifInLocal() {
        if(!this.check()){
            return;
        }
        this.user = JSON.parse(sessionStorage.getItem("user"));
        this.isLoggedIn = true;
        console.log(this.user)
        this.updateStatus(this.user.access);
    }

    async logIn(value: { email: string, password: string, googleToken?: string }) {
        try {
            let user = await this.http.post<USER>(enums.login, value).toPromise();
            this.isLoggedIn = true;
            this.user = { courses: user.courses, name: user.name, emailId: user.emailId, sid_tid: user.sid_tid, access: user.access, isImage: user.isImage };
            this.saveJwt(user.token);
            this.updateStatus(user.access);
            return "login Successfull";

        } catch (err) {
            throw err;
        }
    }
    saveJwt = (jwt: string) => {
        sessionStorage.setItem("jwtToken",jwt)
        sessionStorage.setItem("user", JSON.stringify(this.user));
    }
    check = () => {
        return sessionStorage.getItem("jwtToken")
    }

    constructor(private http: HttpClient) { }
}
