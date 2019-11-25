import {Component, OnInit} from '@angular/core';

import {MatIconRegistry} from '@angular/material';
import {MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import {DomSanitizer} from '@angular/platform-browser';
import {BankService} from '../bank.service';

import {CountryService} from '../services/country/country.service';
import {CurrencyService} from '../services/currency/currency.service';
import {FeeService} from '../services/fee/fee.service';


import {Country} from '../models/Country';
import {Currency} from '../models/Currency';
import {Fee} from '../models/Fee';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.css']
})

export class ConfigureComponent implements OnInit {

  position: MatSnackBarHorizontalPosition = 'right';
  config = new MatSnackBarConfig();
  errorResponse: any;
  currencies: Currency[];
  countries: Country[];
  fees: Fee[];

  constructor(private service: BankService, private registry: MatIconRegistry, private domSanitizer: DomSanitizer,
              private snackBar: MatSnackBar, private currencyService: CurrencyService, private countryService: CountryService,
              private feeService: FeeService) {
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

  deleteCountry(country: Country) {
    // Remove From UI
    this.countries = this.countries.filter(t => t.id !== country.id);
    // Remove from server
    this.countryService.deleteCountry(country).subscribe();
  }

  deleteCurrency(currency: Currency) {
    // Remove From UI
    this.currencies = this.currencies.filter(t => t.id !== currency.id);
    // Remove from server
    this.currencyService.deleteCurrency(currency).subscribe();
  }

  deleteFee(fee: Fee) {
    // Remove From UI
    this.fees = this.fees.filter(t => t.id !== fee.id);
    // Remove from server
    this.feeService.deleteFee(fee).subscribe();
  }

  addCurrency(currency: Currency) {
    this.currencyService.addCurrency(currency).subscribe(currency => {
      //this.currencies.push(currency);
      this.ngOnInit();
    });
  }

  addCountry(country: Country) {
    this.countryService.addCountry(country).subscribe(country => {
      //this.countries.push(country);
      this.ngOnInit();
    });
  }

  addFee(fee: Fee) {
    this.feeService.addFee(fee).subscribe(country => {
      //this.countries.push(country);
      this.ngOnInit();
    });
  }

  ngOnInit() {
    this.configuration();
    this.countryService.getCountries().subscribe(countries => {
      this.countries = countries;
    });
    this.currencyService.getCurrencies().subscribe(currencies => {
      this.currencies = currencies;
    });
    this.feeService.getFees().subscribe(fees => {
      this.fees = fees;
    });
  }

}
