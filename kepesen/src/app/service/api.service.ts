import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable()
export class ApiService {

  database = 'https://us-central1-kepesen-47fcd.cloudfunctions.net/rest/api';

  constructor(
    private http? : HttpClient
  ) { }

  get(apiName : string){
    let header = new HttpHeaders({'x-access-token' : 'asdasd123123'});
    return this.http.get(this.database + apiName, {
      headers : header
    })
  }

}
