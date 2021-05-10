import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { enums } from "../enums/enums"
import {NgxSpinnerService} from "ngx-spinner"
@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    constructor(private http: HttpClient,private spinner:NgxSpinnerService) { }


    changePassword = async (data: any) => {
        this.spinner.show()
        let res = await this.http.post(enums.passwordChange, data).toPromise().then(data => data).catch(err => { return err });
        this.spinner.hide()
        return res;
    }

    passwordCheck = (pswd: string) => {
        const count = [0, 0, 0, 0];
        for (const i of pswd) {
            if (i >= '0' && i <= '9') {
                count[0] = 1;
            } else if (i >= 'A' && i <= 'Z') {
                count[1] = 1;
            } else if (i >= 'a' && i <= 'z') {
                count[2] = 1;
            } else {
                count[3] = 1;
            }
        }
        for (const i in count) {
            if (count[i] !== 1) {
                return false;
            }
        }
        return true;
    }

}