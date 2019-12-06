import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders,} from '@angular/common/http';

import {Fee} from '../models/Fee';
import {environment} from '../../environments/environment.prod';
import {Currency} from '../models/Currency';
import {Country} from '../models/Country';
import {catchError} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
const SERVER_URL_TRIGGER = environment.scrapperTrigger + '/scrapper';
const feesUrl: string = environment.offeredCountCurrFees + '/fees';
const currencyUrl: string = environment.offeredCountCurrFees + '/currencies';
const countryUrl: string = environment.offeredCountCurrFees + '/countries';


@Injectable({
  providedIn: 'root'
})


export class ConfigurationService {

  errorResponse: any;

  constructor(private http: HttpClient) {
  }

  //SCRAPPER TRIGGER
  trigger() {
    console.log('triggered');
    return this.http.get(`${SERVER_URL_TRIGGER}`);
  }

  //FEES
  getFees(): Observable<Fee[]> {
    return this.http.get<Fee[]>(`${feesUrl}`);
  }

  deleteFee(fee: Fee): Observable<Fee> {
    const url = `${feesUrl}/${fee.id}`;
    return this.http.delete<Fee>(url, httpOptions);
  }

  addFee(fee: any): Observable<any> {
    return this.http.post<any>(feesUrl, fee, httpOptions).pipe(
      catchError(this.handleError<any>('data'))
    );
  }

  updateFee(fee: Fee): Observable<any> {
    const url = `${feesUrl}`;
    return this.http.put(url, fee, httpOptions);
  }

  //CURRENCIES

  getCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>(`${currencyUrl}`);
  }

  deleteCurrency(currency: Currency): Observable<Currency> {
    const url = `${currencyUrl}/${currency.id}`;
    return this.http.delete<Currency>(url, httpOptions);
  }

  addCurrency(currency: any): Observable<any> {
    return this.http.post<any>(currencyUrl, currency, httpOptions).pipe(
      catchError(this.handleError<any>('data'))
    );
  }

  updateCurrency(currency: Currency): Observable<any> {
    const url = `${currencyUrl}`;
    return this.http.put(url, currency, httpOptions);
  }

  //COUNTRIES

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${countryUrl}`);
  }

  deleteCountry(country: Country): Observable<Country> {
    const url = `${countryUrl}/${country.id}`;
    return this.http.delete<Country>(url, httpOptions);
  }

  addCountry(country: any): Observable<any> {
    return this.http.post<any>(countryUrl, country, httpOptions).pipe(
      catchError(this.handleError<any>('data'))
    );
  }

  updateCountry(country: Country): Observable<any> {
    const url = `${countryUrl}`;
    return this.http.put(url, country, httpOptions);
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${error.error.errors[0]}`);
      console.log(error);
      this.setResponse(error.error.errors[0]);
      return of(result as T);
    };
  }


  setResponse(text: string) {
    this.errorResponse = text;
  }

  getResponse() {
    return this.errorResponse;
  }

}
