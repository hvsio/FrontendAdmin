import { Component, OnInit } from '@angular/core';
import { BankService } from '../bank.service';
import currencies from 'src/assets/json/currencies.json';
import countries from 'src/assets/json/countries.json';
import units from 'src/assets/json/units.json';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-add-banks',
  templateUrl: './add-banks.component.html',
  styleUrls: ['./add-banks.component.css']
})

export class AddBanksComponent implements OnInit {
  private arr: any[];

  constructor(private service: BankService, private snackBar: MatSnackBar) { }

  curr: any = currencies;
  countrs: any = countries;
  unitsTemp: any = units;
  value = '';
  selectedCurr = '';
  selectedCoun = '';
  selectedUnit = '';
  position: MatSnackBarHorizontalPosition = 'right';
  config = new MatSnackBarConfig();
  addedToDB = false;
  existingInDB = true;

  configuration() {
    this.config.horizontalPosition = this.position;
    this.config.duration = 2000;
    this.config.panelClass = ['snackbar'];
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, undefined, this.config);
  }

  addBank(name: string, country: string, pageurl: string, fromcurrency: string,
          tocurrencyxpath: string, buyxpath: string, sellxpath: string, unit: string) {
    this.service.postBank(name, country, pageurl, fromcurrency, tocurrencyxpath, buyxpath, sellxpath, unit).subscribe(
      data => {
        console.log('POST executed', data);
        if (name === '' || country === '' || pageurl === '' || fromcurrency === ''
          || tocurrencyxpath === '' || buyxpath === '' || sellxpath === ''
          || unit === '') {
          this.openSnackBar('Please fill all the areas', '');
          this.setAddedtoDB(false);
          this.setExistingInDB(false);
        } else {
          if (data === undefined) {
            this.openSnackBar(this.service.getResponse(), '');
            this.setAddedtoDB(false);
            this.setExistingInDB(false);
          } else {
            this.openSnackBar('Bank added successfully!', '');
            this.setAddedtoDB(true);
            this.setExistingInDB(true);
          }
        }
      }
    );
    console.log(this.getExistingInDB());
    console.log(this.getAddedToDB());
  }

  update(value: string) { this.value = value; console.log(this.value); }
  selectCurrency(value: string) { this.selectedCurr = value; console.log(this.selectedCurr); }
  selectCountry(value: string) { this.selectedCoun = value; console.log(this.selectedCoun); }
  selectUnit(value: string) { this.selectedUnit = value; console.log(this.selectedUnit); }
  setExistingInDB(value: boolean) { this.existingInDB = value; }
  setAddedtoDB(value: boolean) { this.addedToDB = value; }
  getExistingInDB() { return this.existingInDB; }
  getAddedToDB() { return this.addedToDB; }

  ngOnInit() {
    this.configuration();
}
}
