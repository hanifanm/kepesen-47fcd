import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TokenService } from './token.service';


@Injectable()
export class ApiService {

  database = 'https://us-central1-kepesen-47fcd.cloudfunctions.net/rest/api';
  // header: HttpHeaders

  constructor(
    private http: HttpClient,
    private tokenService: TokenService 
  ) { }

  getHeader = async() : Promise<HttpHeaders> => {
    let token = await this.tokenService.getToken();
    return new HttpHeaders({ 'x-access-token': token });
  }

  get = async(apiName: string, params?: HttpParams) => {
    let header = await this.getHeader();
    let result = await new Promise((resolve, reject) => {
      this.http.get(this.database + apiName, {
        headers: header,
        params: params
      }).subscribe(
        (data : any) => {
          resolve(data);
        },
        (err : any) => {
          reject(err);
        }
      )
    })
    return result;
  }

  post = async(apiName: string, body?: any) => {
    let header = await this.getHeader();
    let result = await new Promise((resolve, reject) => {
      this.http.post(this.database + apiName, body, {
        headers: header
      }).subscribe(
        (data : any) => {
          resolve(data);
        },
        (err : any) => {
          reject(err);
        }
      )
    })
    return result;
  }

  put = async(apiName: string, body?: any) => {
    let header = await this.getHeader();
    let result = await new Promise((resolve, reject) => {
      this.http.put(this.database + apiName, body, {
        headers: header
      }).subscribe(
        (data : any) => {
          resolve(data);
        },
        (err : any) => {
          reject(err);
        }
      )
    })
    return result;
  }

  delete = async(apiName: string, params?: HttpParams) => {
    let header = await this.getHeader();
    let result = await new Promise((resolve, reject) => {
      this.http.delete(this.database + apiName, {
        headers: header,
        params: params
      }).subscribe(
        (data : any) => {
          resolve(data);
        },
        (err : any) => {
          reject(err);
        }
      )
    })
    return result;
  }

}
