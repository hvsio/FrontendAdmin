import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';

import {BankService} from '../services/bank.service';
import {Bank} from '../models/Bank';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.css']
})
export class BankDetailsComponent implements OnInit {

  bank: Bank;
  name: string;
  country: string;
  pageurl: string;
  buyxpath: string;
  sellxpath: string;
  fromCurrency: string;
  toCurrencyXpath: string;
  unit: string;
  iscrossinverted: boolean;
  exchangeunitxpath = '';

  value = '';
  selectedCurr = '';
  selectedCoun = '';
  options: FormGroup;
  checkedExchangeUnit: boolean;


  constructor(private service: BankService,
              @Inject(MAT_DIALOG_DATA) public data: Bank,
              fb: FormBuilder,
              public dialog: MatDialogRef<BankDetailsComponent>) {
    this.name = data.name;
    this.country = data.country;
    this.pageurl = data.pageurl;
    this.buyxpath = data.buyxpath;
    this.sellxpath = data.sellxpath;
    this.fromCurrency = data.fromCurrency;
    this.toCurrencyXpath = data.toCurrencyXpath;
    this.unit = data.unit;
    this.iscrossinverted = data.iscrossinverted;
    this.exchangeunitxpath = data.exchangeunitxpath;

    this.options = fb.group({
      unit: this.data.unit
    });
  }

  async updateBank(bank: Bank) {
    await this.service.putBank(bank).subscribe(
      data => {
        console.log(bank);
      },
      err => {
        console.log('Error while updating', err);
      }
    );
  }

  ifFullExXpath(value: string): boolean {
    if (value.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  updateExchangeUnit(value: string) {
    this.data.exchangeunitxpath = value;
  }

  selectUnit(value: string) {
    this.data.unit = value;
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async onSaveChanges(data: Bank) {
    !this.checkedExchangeUnit ? this.data.exchangeunitxpath = '' && console.log(this.data.exchangeunitxpath) : null;
    this.updateBank(data);
    await this.delay(1000);
    this.dialog.close();
  }

  ngOnInit() {
    this.checkedExchangeUnit = this.ifFullExXpath(this.data.exchangeunitxpath);
    console.log(this.checkedExchangeUnit);
  }

}
