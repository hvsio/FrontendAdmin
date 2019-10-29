import { Component, OnInit } from '@angular/core';
import { BankService } from '../bank.service';
import currencies from 'src/assets/json/currencies.json';
import countries from 'src/assets/json/countries.json';
import units from 'src/assets/json/units.json';
import {DOWN_ARROW, SPACE, ENTER, UP_ARROW} from '@angular/cdk/keycodes';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http'; 
import { config } from 'rxjs';




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
  value = '';
  selectedCurr:string ='';
  selectedCoun:string='';
  selectedUnit:string='';
  position: MatSnackBarHorizontalPosition = 'right';
  config = new MatSnackBarConfig();

  configuration() {
    this.config.horizontalPosition = this.position;
    this.config.duration = 2000;
    this.config.panelClass = ['snackbar'];
  }

  openSnackBar(message: string, action: string) {
    this.configuration();
    this.snackBar.open(message, undefined, this.config)
    
  }

  addBank(name:string, country:string, pageurl:string, fromcurrency:string, tocurrencyxpath:string, buyxpath:string, sellxpath:string, unit: string) {
    this.service.postBank(name, country, pageurl, fromcurrency, tocurrencyxpath, buyxpath, sellxpath, unit).subscribe(
      data => {
        console.log("POST executed", data) 
        if (name=="" || country=="" || pageurl=="" || fromcurrency=="" || tocurrencyxpath=="" || buyxpath=="" || sellxpath=="" || unit=="") {
          this.openSnackBar("Please fill all the areas", "");
        } else {
        if (data==undefined) {
          this.openSnackBar("Failure while adding the bank", "");
        } else {
            this.openSnackBar("Bank added successfully!", "");
          }
        }
        
      },
      (error: HttpErrorResponse) => {
        console.log("Error ", error)
      }
    )
  };

  update(value: string) { this.value = value; console.log(this.value) }
  selectCurrency(value: string) { this.selectedCurr = value; console.log(this.selectedCurr) }
  selectCountry(value: string) { this.selectedCoun = value; console.log(this.selectedCoun) }
  selectUnit(value: string) { this.selectedUnit = value; console.log(this.selectedUnit) }

  ngOnInit() {

}
}
