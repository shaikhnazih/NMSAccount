import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }
  rootURL = '/api';

   get(type: string) {
    console.log(type)
    return this.http.post(this.rootURL + '/dashboard', {type:type});
  }
}
