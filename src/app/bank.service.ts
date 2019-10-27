import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of, pipe} from "rxjs";
import {Bank} from './bank';
import {BANKS} from './list';
import { catchError, map, tap } from 'rxjs/operators';
import { delay } from 'rxjs/internal/operators';
import { ControlContainer } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';


const SERVER_URL: string = 'http://localhost:8000/banks';

@Injectable({
  providedIn: 'root',
}) 
export class BankService {
  
  constructor (private http:HttpClient, private snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  

  getBank(bankId: number) {
    return this.http.get(`${SERVER_URL}/${bankId}`)
    .pipe(
      catchError(this.handleError<any>('data'))
    );
  }

  // getBanks(): Observable<Bank[]> {
  //   this.http.get(`${SERVER_URL}`).subscribe (
  //     (data:Bank[]) => {
  //       for (let i in data) {
  //         var bankie = new Bank(data[i].name, data[i].country, data[i].pageurl, data[i].buyxpath, data[i].sellxpath, data[i].fromCurrency, data[i].toCurrencyXpath);
  //         BANKS.push(bankie);
  //         console.log("Bank service is working");
  //       }
  //       console.log(BANKS);
  //     }
  //   )
    
  //   return of (BANKS);
  // }

    getBanks() {
      return this.http.get(`${SERVER_URL}`)
  }
  

  deleteBank(bankId: string) {
    return this.http.delete(`${SERVER_URL}/${bankId}`)
  }

  postBank(name:string, country:string, pageurl:string, fromcurrency:string, tocurrencyxpath:string, buyxpath:string, sellxpath:string, unit: string) {
  return this.http.post(`${SERVER_URL}`, 
  {
    "name": name,
    "country": country,
    "pageurl": pageurl,
    "fromcurrency": fromcurrency,
    "tocurrencyxpath": tocurrencyxpath,
    "buyxpath": buyxpath,
    "sellxpath": sellxpath,
    "unit": unit,
 
  }).pipe(
    catchError(this.handleAddingError<any>('data', "Failure while adding the bank", "close"))
  );
}

  putBank(bank: Bank) {
    return this.http.put(`${SERVER_URL}`, {
    "name": bank.name,
    "country": bank.country,
    "pageurl": bank.pageurl,
    "fromcurrency": bank.fromCurrency,
    "tocurrencyxpath": bank.toCurrencyXpath,
    "buyxpath": bank.buyxpath,
    "sellxpath": bank.sellxpath,
    "unit": bank.unit 
    }
    ).pipe(
      catchError(this.handleError<any>('data'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private handleAddingError<T> (operation = 'operation', message: string, action: string, result?: T) {
    return (error: any): Observable<T> => {
  
      this.openSnackBar(message, action);

      console.error(error); 
  
    
      console.log(`${operation} failed: ${error.message}`);
  
      
      return of(result as T);
    };
  }

}