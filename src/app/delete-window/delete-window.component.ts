import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Bank } from '../models/Bank';
import { BankService } from '../services/bank.service';

@Component({
  selector: 'app-delete-window',
  templateUrl: './delete-window.component.html',
  styleUrls: ['./delete-window.component.css']
})
export class DeleteWindowComponent implements OnInit {

  bank: Bank;

  constructor(private service: BankService,
              @Inject(MAT_DIALOG_DATA) public data: Bank,
              public dialog: MatDialogRef<DeleteWindowComponent>) {
      this.bank = data;
     }

  async onYes(bank: Bank) {
    this.service.deleteBank(bank.id).subscribe();
    this.dialog.close();
  }

  onNo() {
    this.dialog.close();
  }

  ngOnInit() {
  }

}
