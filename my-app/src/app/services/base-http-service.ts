import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()
export class BaseHttpService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }
  getHeaders(): HttpHeaders {
    this.createAuthorizationHeader();
    return this.headers;
  }
  createAuthorizationHeader() {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.headers.set('Authorization', 'Bearer ' + token);

    }
  }


  Post(url: string, body: any) {
    return this.http.post(url, body).toPromise();
  }

  Put(url, model: any) {
    return this.http.put(url, model).toPromise();
  }

  Get(url: string) {
    //this.createAuthorizationHeader();
    return this.http.get(url,{headers: this.headers}).toPromise();
  }

  Delete(url: string) {
    return this.http.delete(url).toPromise();
  }

}




