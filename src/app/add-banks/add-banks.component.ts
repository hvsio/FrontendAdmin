import { Component, OnInit } from '@angular/core';
import { BankService } from '../bank.service';

import currencies from 'src/assets/json/currencies.json';
import countries from 'src/assets/json/countries.json';
import units from 'src/assets/json/units.json';

import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import {Bank} from '../bank';

@Component({
  selector: 'app-add-banks',
  templateUrl: './add-banks.component.html',
  styleUrls: ['./add-banks.component.css']
})

export class AddBanksComponent implements OnInit {

  constructor(private service: BankService, private snackBar: MatSnackBar) { }

  curr: any = currencies;
  countrs: any = countries;
  unitsTemp: any = units;
  bank: Bank;

  value = '';
  selectedCurr = '';
  selectedCoun = '';
  selectedUnit = '';
  checkedCross = false;
  checkedExchangeUnit = false;
  exchangeunitxpath = '';

  position: MatSnackBarHorizontalPosition = 'right';
  config = new MatSnackBarConfig();

  configuration() {
    this.config.horizontalPosition = this.position;
    this.config.duration = 2000;
    this.config.panelClass = ['snackbar'];
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, undefined, this.config);
  }

  addBank(name: string, country: string, pageurl: string, fromcurrency: string,
          tocurrencyxpath: string, buyxpath: string, sellxpath: string,
          unit: string, iscrossinverted: boolean, exchangeunitxpath: string) {
    console.log(name, country, pageurl, fromcurrency, tocurrencyxpath, buyxpath,
      sellxpath, unit, iscrossinverted, exchangeunitxpath);
    this.service.postBank(name, country, pageurl, fromcurrency, tocurrencyxpath, buyxpath,
      sellxpath, unit, iscrossinverted, exchangeunitxpath).subscribe(
      data => {
        console.log('POST executed', data);
        if (name === '' || country === '' || pageurl === '' || fromcurrency === ''
          || tocurrencyxpath === '' || buyxpath === '' || sellxpath === ''
          || unit === '' ) {
          this.openSnackBar('Please fill all the areas');
        } else {
          if (data === undefined) {
            this.openSnackBar(this.service.getResponse());
          } else {
            this.openSnackBar('Bank added successfully!');
          }
        }
      }
    );
  }

  onEnterCoun(evt: any, s: string) {
    if (evt.source.selected) {
      this.selectedCoun = s;
    }
  }
  onEnterCurr(evt: any, s: string) {
    if (evt.source.selected) {
      this.selectedCurr = s;
    }
  }
  onEnterUnit(evt: any, s: string) {
    if (evt.source.selected) {
      this.selectedUnit = s;
    }
  }

  updateExchangeUnit(value: string) { this.exchangeunitxpath = value; }
  selectCurrency(value: string) { this.selectedCurr = value; }
  selectCountry(value: string) { this.selectedCoun = value; }
  selectUnit(value: string) { this.selectedUnit = value; }

  ngOnInit() {
    this.configuration();
}

}
