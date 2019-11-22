import {Component, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-add-currency',
  templateUrl: './add-currency.component.html',
  styleUrls: ['./add-currency.component.css']
})

export class AddCurrencyComponent implements OnInit {
  @Output() addCurrency: EventEmitter<any> = new EventEmitter();

  name: string;

  constructor() {
  }

  ngOnInit() {
  }

  onSubmit() {
    const currency = {
      name: this.name,
      allowed: true
    };

    this.addCurrency.emit(currency);
  }

}
