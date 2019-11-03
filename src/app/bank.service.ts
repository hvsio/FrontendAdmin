import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, pipe} from 'rxjs';
import {Bank} from './bank';
import {catchError} from 'rxjs/operators';
import {environment} from 'src/environments/environment.prod';


const SERVER_URL: string = environment.scrapperConfig + '/banks';
// const SERVER_URL = 'http://localhost:8000/banks';


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
           buyxpath: string, sellxpath: string, unit: string) {
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
        'unit': bank.unit
      }
    ).pipe(
      catchError(this.handleError<any>('data'))
    );
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(`${error.error.errors}`);
      this.setResponse(`${error.error.errors}`)
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
