import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {MatIconRegistry} from '@angular/material';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import {DomSanitizer} from '@angular/platform-browser';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.css']
})

@Injectable({
  providedIn: 'root',
})
export class ConfigureComponent implements OnInit {

  position: MatSnackBarHorizontalPosition = 'right';
  config = new MatSnackBarConfig();
  errorResponse: any;

  constructor(private http: HttpClient, private registry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              private snackBar: MatSnackBar) {
    this.registry.addSvgIcon(`trigger-button`, this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/trigger-btn.svg'));
  }

  triggerURL() {
    console.log('triggered');
    return this.http.get('http://35.228.30.139:8002').pipe(
     catchError(this.handleError<any>('data'))
   );
  }

  async triggerScrapper() {
    await this.triggerURL();
    this.openSnackBar('Scrapping started');
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, undefined, this.config);
  }

  configuration() {
    this.config.horizontalPosition = this.position;
    this.config.duration = 2000;
    this.config.panelClass = ['snackbar'];
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
        console.error(`${error.error.errors}`);
        this.setResponse(`${error.error.errors}`);
        this.openSnackBar(this.getResponse());
        return of(result as T);
    };
  }
  setResponse(text: string) {
    this.errorResponse = text;
  }

  getResponse() {
    return this.errorResponse;
  }


  ngOnInit() {
    this.configuration();
  }

}
