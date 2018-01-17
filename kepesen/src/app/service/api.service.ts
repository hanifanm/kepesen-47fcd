import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'

@Injectable()
export class ApiService {

  database = 'https://us-central1-kepesen-47fcd.cloudfunctions.net/rest/api';
  header: HttpHeaders

  constructor(
    private http?: HttpClient
  ) {
    this.header = new HttpHeaders({ 'x-access-token': 'asdasd123123' });
  }

  get(apiName: string, params?: HttpParams) {
    return this.http.get(this.database + apiName, {
      headers: this.header,
      params: params
    })
  }

  post(apiName: string, body?: any) {
    return this.http.post(this.database + apiName, body, {
      headers: this.header
    })
  }

  put(apiName: string, body?: any) {
    return this.http.put(this.database + apiName, body, {
      headers: this.header
    })
  }

  delete(apiName: string, params?: HttpParams) {
    return (this.database + apiName, {
      headers: this.header,
      params: params
    })
  }

}
