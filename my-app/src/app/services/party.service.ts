import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PartyService {

  constructor(private http: HttpClient) { }
  rootURL = '/api';

  getParties() {
    return this.http.get(this.rootURL + '/party');
  }

  addParty(party: any) {
    return this.http.post(this.rootURL + '/party', { party });
  }
}
