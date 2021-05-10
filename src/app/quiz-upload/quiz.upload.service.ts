import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { enums } from "../enums/enums"
import * as moment from "moment";
@Injectable({
    providedIn: 'root'
})
export class QuizUploadService {
    upload = async (quiz: any) => {
        const list = await this.http.post(enums.uploadQuiz, quiz).toPromise().then(
            data => data).catch(err => err);
        return list;
    }

    constructor(private http: HttpClient) { }



}