import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { enums } from "../enums/enums"
import * as moment from "moment-timezone";
@Injectable({
    providedIn: 'root'
})
export class QuizService {
    getList = async (heading) => {
        const list = await this.http.get(`${enums.getQuiz}\\${heading}`).toPromise().then(
            data => data).catch(err => err);
        list.forEach((el: any) => {
            el.start_date = moment(el.start_date).local().format("DD-MM-YYYY,HH:mm A")
            el.time = el.start_date.split(",")[1];
            el.start_date = el.start_date.split(",")[0];
        });
        return list;
    }

    constructor(private http: HttpClient) { }



}