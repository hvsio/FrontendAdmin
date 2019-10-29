import {Component, OnInit, Inject} from '@angular/core';
import {BankService} from '../bank.service';
import {Bank} from '../bank';
import currencies from 'src/assets/json/currencies.json';
import countries from 'src/assets/json/countries.json';
<<<<<<< HEAD
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {FormBuilder, FormGroup } from '@angular/forms';
=======
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
>>>>>>> f4ebeab31cd72d6175eeab76397f92774a38325e

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

  curr: any = currencies;
  countrs: any = countries;
  value = '';
<<<<<<< HEAD
  selectedCurr:string ='';
  selectedCoun:string='';
  selectedUnit: string='';
  options: FormGroup;

  

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

      this.options = fb.group({
        unit: this.data.unit
      });
    }
=======
  selectedCurr: string = '';
  selectedCoun: string = '';
  options: FormGroup;

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

    this.options = fb.group({
      assignedCoun: data.country,
      assignedCurr: data.fromCurrency
    });
  }
>>>>>>> f4ebeab31cd72d6175eeab76397f92774a38325e

  updateBank(bank: Bank) {
    this.service.putBank().subscribe(
      data => {
        console.log();
      },
      err => {
        console.log("Error while updating", err)
      }
    )
  };

<<<<<<< HEAD
  update(value: string) { this.value = value; console.log(this.value) }
  selectCurrency(value: string) { this.selectedCurr = value; console.log(this.selectedCurr) }
  selectCountry(value: string) { this.selectedCoun = value; console.log(this.selectedCoun) }
  selectUnit(value: string) { this.data.unit = value; console.log(this.data.unit + "selectUnit"); }
=======
  update(value: string) {
    this.value = value;
    console.log(this.value)
  }

  selectCurrency(value: string) {
    this.selectedCurr = value;
    console.log(this.selectedCurr)
  }

  selectCountry(value: string) {
    this.selectedCoun = value;
    console.log(this.selectedCoun)
  }
>>>>>>> f4ebeab31cd72d6175eeab76397f92774a38325e

  onSaveChanges(data: Bank) {
    this.updateBank(data);
    this.dialog.close();
  }

<<<<<<< HEAD
  ngOnInit() { 
    console.log(this.options.value)
=======
  // getBank(): void {
  //   const id: number = +this.route.snapshot.paramMap.get('id');
  //   this.service.getBank(id)
  //   .subscribe(bank => this.bank = bank);
  // }

  ngOnInit() {
>>>>>>> f4ebeab31cd72d6175eeab76397f92774a38325e
  }

}
