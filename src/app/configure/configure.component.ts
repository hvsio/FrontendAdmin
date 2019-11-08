import { Component, OnInit } from '@angular/core';

import {MatIconRegistry} from '@angular/material';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import {DomSanitizer} from '@angular/platform-browser';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {BankService} from '../bank.service';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.css']
})

export class ConfigureComponent implements OnInit {

  position: MatSnackBarHorizontalPosition = 'right';
  config = new MatSnackBarConfig();
  errorResponse: any;

  constructor(private service: BankService, private registry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              private snackBar: MatSnackBar) {
    this.registry.addSvgIcon(`trigger-button`, this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/trigger-btn.svg'));
  }

  triggerScrapper() {
    this.service.trigger().subscribe();
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


  ngOnInit() {
    this.configuration();
  }

}
