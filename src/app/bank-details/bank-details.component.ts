import { Component, OnInit, Inject } from '@angular/core';
import { BankService } from '../bank.service';
import { Bank } from '../bank';
import currencies from 'src/assets/json/currencies.json';
import countries from 'src/assets/json/countries.json';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
  selectedCurr:string ='';
  selectedCoun:string='';
  selectedUnit:string='';
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
        assignedCurr: data.fromCurrency}); 
     }

  updateBank(bank: Bank) {
    this.service.putBank(bank).subscribe(
      data => {
        console.log(bank);
      },
      err => {
        console.log("Error while updating", err)
      }
    )
  };

  update(value: string) { this.value = value; console.log(this.value) }
  selectCurrency(value: string) { this.selectedCurr = value; console.log(this.selectedCurr) }
  selectCountry(value: string) { this.selectedCoun = value; console.log(this.selectedCoun) }
  selectUnit(value: string) { this.selectedUnit = value; console.log(this.selectedUnit) }

  onSaveChanges(data: Bank) {
    console.log(data)
    this.updateBank(data);
    this.dialog.close();
  }

  // getBank(): void {
  //   const id: number = +this.route.snapshot.paramMap.get('id');
  //   this.service.getBank(id)
  //   .subscribe(bank => this.bank = bank);
  // }

  ngOnInit() { 
  }

}
