
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }
  rootURL = '/api';

  getTransactions() {
    return this.http.get(this.rootURL + '/transaction');
  }

  addTransactions(transaction: any) {
    console.log(transaction)
    return this.http.post(this.rootURL + '/transaction', transaction);
  }
}
