import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CurrencyService} from '../../services/currency/currency.service';

import {Currency} from 'src/app/models/Currency';
import {Country} from '../../models/Country';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {

  @Input() currency: Currency;
  @Output() deleteCurrency: EventEmitter<Currency> = new EventEmitter<Currency>();

  constructor(private currencyService: CurrencyService) {
  }

  ngOnInit() {
  }

  // Set Dynamic Classes
  setClasses() {
    return {
      currency: true,
      'is-allowed': this.currency.allowed
    };
  }

  onToggle(currency) {
    // Toggle in UI
    currency.allowed = !currency.allowed;
    // Toggle on server
    this.currencyService.updateCurrency(currency).subscribe(currency => console.log(currency));
  }

  onDelete(currency) {
    this.deleteCurrency.emit(currency);
  }
}
