import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { enums } from "../enums/enums"





@Injectable({
    providedIn: 'root'
})
export class StudentService {
    async getimg(e: any) {
      let img = await this.http.get(enums.getImg,{params:{id:e.id}}).toPromise().then(data=>data).catch(err=>"null");
      return img
    }
    constructor(private http: HttpClient) {

    }
    getList = async (subject) => {
        const list = await this.http.get(`${enums.students}\\${subject}`).toPromise().then(data=>data).catch(err=>[])
        console.log(list)
        return list;
    }
}
