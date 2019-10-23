import { Component, OnInit } from '@angular/core';
import { BankService } from '../bank.service';
import currencies from 'src/assets/json/currencies.json';
import countries from 'src/assets/json/countries.json';
import { BANKS } from '../list';


@Component({
  selector: 'app-add-banks',
  templateUrl: './add-banks.component.html',
  styleUrls: ['./add-banks.component.css']
})



export class AddBanksComponent implements OnInit {

  constructor(private service: BankService) { }

  curr: any = currencies;
  countrs: any = countries;
  value = '';
  selectedCurr:string ='';
  selectedCoun:string='';



  addBank(name:string, country:string, pageurl:string, fromcurrency:string, tocurrencyxpath:string, buyxpath:string, sellxpath:string, unit: string) {
    this.service.postBank(name, country, pageurl, fromcurrency, tocurrencyxpath, buyxpath, sellxpath, unit).subscribe(
      data => {
        console.log("POST executed", data); 
      },
      err => {
        console.log("Error ", err)
      }
    )
  };

  update(value: string) { this.value = value; console.log(this.value) }
  selectCurrency(value: string) { this.selectedCurr = value; console.log(this.selectedCurr) }
  selectCountry(value: string) { this.selectedCoun = value; console.log(this.selectedCoun) }

  ngOnInit() {

}
}
