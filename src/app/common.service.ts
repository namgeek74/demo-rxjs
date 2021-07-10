import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private httpClient: HttpClient) {}

  api1(param: any): Observable<any> {
    return this.httpClient.get(`https://jsonplaceholder.typicode.com/posts`);
  }

  api2(param: any): Observable<any> {
    return this.httpClient.get(
      `https://jsonplaceholder.typicode.com/posts?${param}`
    );
  }

  api3(param: any): Observable<any> {
    return this.httpClient.get(
      `https://jsonplaceholder.typicode.com/posts?${param}`
    );
  }

  api4(param: any): Observable<any> {
    return this.httpClient.get(
      `https://jsonplaceholder.typicode.com/posts?${param}`
    );
  }
}