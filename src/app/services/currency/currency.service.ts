import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Currency } from '../../models/Currency';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  currenciesUrl:string = 'http://35.193.212.114:8000/currencies';
  currenciesLimit = '?_limit=5';

  constructor(private http:HttpClient) { }

  // Get Currencies
  getCurrencies():Observable<Currency[]> {
    return this.http.get<Currency[]>(`${this.currenciesUrl}`);
  }

  // Delete Currency
  deleteCurrency(currency:Currency):Observable<Currency> {
    const url = `${this.currenciesUrl}/${currency.id}`;
    return this.http.delete<Currency>(url, httpOptions);
  }

  // Add Currency
  addCurrency(currency:Currency):Observable<Currency> {
    return this.http.post<Currency>(this.currenciesUrl, currency, httpOptions);
  }

  // Update Currency
  updateCurrency(currency: Currency):Observable<any> {
    const url = `${this.currenciesUrl}`;
    return this.http.put(url, currency, httpOptions);
  }
}
