import {Component, OnInit} from '@angular/core';

import {MatIconRegistry} from '@angular/material';
import {MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import {DomSanitizer} from '@angular/platform-browser';
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
  fees: Fee[];

  feeCoun = '';
  feeSepa = '';
  feeIntl = '';
  feeCurr = '';

  isLoadingFees = true;

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

  checkEmptyValues(sepa, intl, country, currency: string): boolean {
    if (sepa === '' || intl === '' || country === '' || currency ==='' || sepa === null || intl === null
      || country === null || currency === null) {
      return false;
    } else {
      return true;
    }
  }

  onEditFee(fee: Fee, sepa, intl: string) {
    fee.sepa = sepa;
    fee.intl = intl;
    this.configurationService.updateFee(fee).subscribe(fee => this.openSnackBar("Fee updated successfully!"));
  }

  deleteFee(fee: Fee) {
    // Remove From UI
    this.fees = this.fees.filter(t => t.id !== fee.id);
    this.configurationService.deleteFee(fee).subscribe();
  }

  addFee(passedCountry, passedSepa, passedIntl, passedCurrency: string) {
    if (this.checkEmptyValues(passedCountry, passedSepa, passedIntl, passedCurrency)) {
      const fee = {
        currency: passedCurrency,
        country: passedCountry,
        sepa: passedSepa,
        intl: passedIntl
      };
      this.configurationService.addFee(fee).subscribe(country => {
        this.ngOnInit();
        if (this.configurationService.getResponse()!== undefined) {
          this.openSnackBar(this.configurationService.errorResponse);
          this.configurationService.errorResponse = '';
        } else {
          this.openSnackBar("Fee added succesfully!")
        }
        this.feeIntl = '';
        this.feeSepa = '';
        this.feeCoun = '';
        this.feeCurr = '';
      });
    } else if (!(this.checkEmptyValues(passedCountry, passedSepa, passedIntl, passedCurrency))) {
      this.openSnackBar('Please fill all the fields to add the fee.');
    }
  }


  ngOnInit() {
    this.configuration();
    this.configurationService.getFees().subscribe(fees => {
      this.fees = fees;
      console.log(this.fees);
      this.isLoadingFees = false;
    });

  }

}
