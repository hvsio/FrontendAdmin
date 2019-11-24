import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {FeeService} from '../../services/fee/fee.service';

import {Fee} from '../../models/Fee';

@Component({
  selector: 'app-fee',
  templateUrl: './fee.component.html',
  styleUrls: ['./fee.component.css']
})

export class FeeComponent implements OnInit {

  @Input() fee: Fee;
  @Output() editFee: EventEmitter<any> = new EventEmitter<any>();
  myVar: boolean;
  buttonLabel: string;
  sepa: string;
  intl: string;

  constructor(private feeService: FeeService) {
    this.myVar = false;
    this.buttonLabel = this.changeLabel(this.myVar)
  }

  ngOnInit() {
    this.sepa = this.fee.sepa;
    this.intl = this.fee.intl;
  }

  // Set Dynamic Classes
  // setClasses() {
  //   return {
  //     country: true,
  //     'is-allowed': this.country.allowed
  //   };
  // }

  // onToggle(country) {
  //   // Toggle in UI
  //   country.allowed = !country.allowed;
  //   // Toggle on server
  //   this.feeService.(country).subscribe(country => console.log(country));
  // }

  changeLabel(tof): string{
    let str: string;

    if (tof)
      str = "Submit";
    else
      str = "Modify";

    return str;
  }

  onEdit(fee) {
    // TODO: figure out updating and deleting fees
    if (this.myVar){
      fee.sepa = this.sepa;
      fee.intl = this.intl;
      console.log(fee)
      this.editFee.emit(fee);
      this.feeService.updateFee(fee).subscribe(fee => console.log(fee));
    }

    this.myVar = !this.myVar;
    this.buttonLabel = this.changeLabel(this.myVar);
  }
}
