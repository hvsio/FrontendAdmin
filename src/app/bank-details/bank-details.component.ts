import { Component, OnInit } from '@angular/core';
import { BankService } from '../bank.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Bank } from '../bank';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.css']
})
export class BankDetailsComponent implements OnInit {

  bank: Bank;

  constructor(private service: BankService, 
              private route: ActivatedRoute,
              private location: Location) { }

  updateBank() {
    this.service.putBank().subscribe(
      data => {
        console.log("UPDATE DONE", data);
      },
      err => {
        console.log("Error while updating", err)
      }
    )
  };

  // getBank(): void {
  //   const id: number = +this.route.snapshot.paramMap.get('id');
  //   this.service.getBank(id)
  //   .subscribe(bank => this.bank = bank);
  // }

  ngOnInit() {
  }

}
