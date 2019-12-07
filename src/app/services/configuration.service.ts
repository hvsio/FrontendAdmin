import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders,} from '@angular/common/http';

import {Fee} from '../models/Fee';
import {environment} from '../../environments/environment.prod';
import {catchError} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
const SERVER_URL_TRIGGER = environment.scrapperTrigger + '/scrapper';
const feesUrl: string = environment.offeredCountCurrFees + '/fees';


@Injectable({
  providedIn: 'root'
})


export class ConfigurationService {

  errorResponse: any;

  constructor(private http: HttpClient) {
  }

  trigger() {
    return this.http.get(`${SERVER_URL_TRIGGER}`);
  }

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
