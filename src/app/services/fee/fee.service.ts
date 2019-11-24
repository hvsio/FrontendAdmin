import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Fee } from '../../models/Fee';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class FeeService {
  // feesUrl:string = 'http://35.193.212.114:8000/fees';
  feesUrl:string = 'http://localhost:8000/fees';
  currenciesLimit = '?_limit=5';

  constructor(private http:HttpClient) { }

  // Get Fees
  getFees():Observable<Fee[]> {
    return this.http.get<Fee[]>(`${this.feesUrl}`);
  }

  // Delete Fee
  deleteFee(fee:Fee):Observable<Fee> {
    const url = `${this.feesUrl}/${fee.id}`;
    return this.http.delete<Fee>(url, httpOptions);
  }

  // Add Currency
  addFee(fee:Fee):Observable<Fee> {
    return this.http.post<Fee>(this.feesUrl, fee, httpOptions);
  }

  // Update Currency
  updateFee(fee: Fee):Observable<any> {
    const url = `${this.feesUrl}`;
    return this.http.put(url, fee, httpOptions);
  }
}
