import {Component, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-add-fee',
  templateUrl: './add-fee.component.html',
  styleUrls: ['./add-fee.component.css']
})
export class AddFeeComponent implements OnInit {
  @Output() addFee: EventEmitter<any> = new EventEmitter();

  country: string;
  sepa: string;
  intl: string;

  constructor() {
  }

  ngOnInit() {
  }

  onSubmit() {
    const fee = {
      country: this.country,
      sepa: this.sepa,
      intl: this.intl
    };

    this.addFee.emit(fee);
    this.country = null;
    this.sepa = null;
    this.intl = null;
  }

}
