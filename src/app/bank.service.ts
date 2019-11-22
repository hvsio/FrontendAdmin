import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Bank} from './bank';
import {catchError} from 'rxjs/operators';
import {environment} from 'src/environments/environment.prod';

const SERVER_URL = environment.scrapperConfig + '/banks';
const SERVER_URL_TRIGGER = environment.scrapperTrigger + '/scrapper'

@Injectable({
  providedIn: 'root',
})
export class BankService {
  errorResponse: any;
  constructor(private http: HttpClient) {}
  getBanks() {
    return this.http.get(`${SERVER_URL}`);
  }

  deleteBank(bankId: string) {
    return this.http.delete(`${SERVER_URL}/${bankId}`)
      .pipe(
        catchError(this.handleError<any>('data'))
      );
  }

  postBank(name: string, country: string, pageurl: string, fromcurrency: string, tocurrencyxpath: string,
           buyxpath: string, sellxpath: string, unit: string, iscrossinverted: boolean, exchangeunitxpath: string ) {
    return this.http.post(`${SERVER_URL}`,
      {
        'name': name,
        'country': country,
        'pageurl': pageurl,
        'fromcurrency': fromcurrency,
        'tocurrencyxpath': tocurrencyxpath,
        'buyxpath': buyxpath,
        'sellxpath': sellxpath,
        'unit': unit,
        'iscrossinverted': iscrossinverted,
        'exchangeunitxpath': exchangeunitxpath,

      }).pipe(
      catchError(this.handleError<any>('data'))
    );
  }

  putBank(bank: Bank) {
    return this.http.put(`${SERVER_URL}`, {
        'name': bank.name,
        'country': bank.country,
        'pageurl': bank.pageurl,
        'fromcurrency': bank.fromCurrency,
        'tocurrencyxpath': bank.toCurrencyXpath,
        'buyxpath': bank.buyxpath,
        'sellxpath': bank.sellxpath,
        'unit': bank.unit,
        'iscrossinverted': bank.iscrossinverted,
        'exchangeunitxpath': bank.exchangeunitxpath,
      }
    ).pipe(
      catchError(this.handleError<any>('data'))
    );
  }

  trigger() {
    console.log('triggered');
    return this.http.get(`${SERVER_URL_TRIGGER}`).pipe(
      catchError(this.handleError<any>('data'))
    );
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${error.error.errors}`);
      this.setResponse(`${error.error.errors}`);
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
