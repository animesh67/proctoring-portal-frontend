import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { enums } from "../enums/enums"





@Injectable({
    providedIn: 'root'
})
export class StudentService {
    constructor(private http: HttpClient) {

    }
    getList = async (subject) => {
        const list = await this.http.get(`${enums.students}\\${subject}`).toPromise().then(data=>data).catch(err=>[])
        console.log(list)
        return list;
    }
}
