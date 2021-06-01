import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { enums } from "../enums/enums"
import {InfoDialog} from "../services/infoDialog"

@Injectable({
    providedIn: 'root'
})
export class ShowQuizService {
    isChecked=false;
    showInfo(message:string){
        this.info.display("Info",message);
    }

    // upload = async (quiz: any) => {
    //     const list = await this.http.post(enums.uploadQuiz, quiz).toPromise().then(
    //         data => data).catch(err => err);
    //     return list;
    // }

    constructor(private http: HttpClient,private info:InfoDialog) { }



}