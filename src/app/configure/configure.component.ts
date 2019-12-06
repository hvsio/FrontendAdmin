import {Component, OnInit} from '@angular/core';

import {MatIconRegistry} from '@angular/material';
import {MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import {DomSanitizer} from '@angular/platform-browser';

// import {Country} from '../models/Country';
// import {Currency} from '../models/Currency';
import {Fee} from '../models/Fee';
import {ConfigurationService} from '../services/configuration.service';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.css']
})

export class ConfigureComponent implements OnInit {

  position: MatSnackBarHorizontalPosition = 'right';
  config = new MatSnackBarConfig();
  // currencies: Currency[];
  // countries: Country[];
  fees: Fee[];

  feeCoun = '';
  feeSepa = '';
  feeIntl = '';

  // country: Country;
  // avCountryInput = '';

  // currency: Currency;
  // avCurrencyInput = '';

  isLoadingFees = true;
  // isLoadingCountries = true;
  // isLoadingCurrencies = true;

  constructor(private registry: MatIconRegistry, private domSanitizer: DomSanitizer,
              private snackBar: MatSnackBar, private configurationService: ConfigurationService) {
    this.registry.addSvgIcon(`trigger-button`, this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/trigger-btn.svg'));
    this.registry.addSvgIcon(`deleteN1`, this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/deleteN1.svg'));

  }

  triggerScrapper() {
    this.configurationService.trigger().subscribe();
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

  //FEES PART

  checkEmptyValues(sepa, intl, country: string): boolean {
    if (sepa === '' || intl === '' || country === '' || sepa === null || intl === null || country === null) {
      return false;
    } else {
      return true;
    }
  }

  onEditFee(fee: Fee, sepa, intl: string) {
    fee.sepa = sepa;
    fee.intl = intl;
    console.log(fee);
    this.configurationService.updateFee(fee).subscribe(fee => this.openSnackBar("Fee updated successfully!"));
  }

  deleteFee(fee: Fee) {
    // Remove From UI
    this.fees = this.fees.filter(t => t.id !== fee.id);
    this.configurationService.deleteFee(fee).subscribe();
  }

  addFee(passedCountry: string, passedSepa: string, passedIntl: string) {
    if (this.checkEmptyValues(passedCountry, passedSepa, passedIntl)) {
      const fee = {
        country: passedCountry,
        sepa: passedSepa,
        intl: passedIntl
      };
      this.configurationService.addFee(fee).subscribe(country => {
        this.ngOnInit();
        console.log(fee);
        if (this.configurationService.getResponse()!== undefined) {
          this.openSnackBar(this.configurationService.errorResponse);
          this.configurationService.errorResponse = '';
        } else {
          this.openSnackBar("Fee added succesfully!")
        }
        this.feeIntl = '';
        this.feeSepa = '';
        this.feeCoun = '';
      });
    } else if (!(this.checkEmptyValues(passedCountry, passedSepa, passedIntl))) {
      this.openSnackBar('Please fill all the fields to add the fee.');
    }
    console.log("SEPA " + this.feeSepa);
    console.log("INTL " + this.feeIntl);
    console.log("COUNT " + this.feeCoun);
  }

  // //CURRENCY PART
  // addCurrency(name: string) {
  //   const currency = {
  //     name: name,
  //     allowed: true
  //   };
  //   this.configurationService.addCurrency(currency).subscribe(currency => {
  //     this.ngOnInit();
  //     if (this.configurationService.getResponse()!== '') {
  //       console.log('RESPONSE: ' + this.configurationService.getResponse());
  //       this.openSnackBar(this.configurationService.errorResponse);
  //       this.configurationService.errorResponse = '';
  //     }
  //   });
  //   this.avCurrencyInput = '';
  // }
  //
  // onDeleteCurr(currency) {
  //   this.currencies = this.currencies.filter(t => t.id !== currency.id);
  //   this.configurationService.deleteCurrency(currency).subscribe();
  // }
  //
  // //COUNTRY PART
  //
  //
  // onDeleteCoun(country) {
  //   this.countries = this.countries.filter(t => t.id !== country.id);
  //   this.configurationService.deleteCountry(country).subscribe();
  // }
  //
  // addCountry(name: string) {
  //   const country = {
  //     name: name,
  //     allowed: true
  //   };
  //   this.configurationService.addCountry(country).subscribe(country => {
  //     this.ngOnInit();
  //     if (this.configurationService.getResponse()!== '') {
  //       console.log('RESPONSE: ' + this.configurationService.getResponse());
  //       this.openSnackBar(this.configurationService.errorResponse);
  //       this.configurationService.errorResponse = '';
  //     }
  //   });
  //   this.avCountryInput = '';
  // }
  //
  // onToggleCurr(obj) {
  //   obj.allowed = !obj.allowed;
  //   console.log(obj);
  //   this.configurationService.updateCurrency(obj).subscribe(currency => console.log(currency));
  // }
  //
  // onToggleCoun(obj) {
  //   obj.allowed = !obj.allowed;
  //   console.log(obj);
  //   this.configurationService.updateCountry(obj).subscribe(country => console.log(country));
  // }

  ngOnInit() {
    this.configuration();
    // this.configurationService.getCountries().subscribe(countries => {
    //   this.countries = countries;
    //   console.log(this.countries);
    //   this.isLoadingCountries = false;
    // });
    // this.configurationService.getCurrencies().subscribe(currencies => {
    //   this.currencies = currencies;
    //   console.log(this.currencies);
    //   this.isLoadingCurrencies = false;
    // });
    this.configurationService.getFees().subscribe(fees => {
      this.fees = fees;
      console.log(this.fees);
      this.isLoadingFees = false;
    });

  }

}
