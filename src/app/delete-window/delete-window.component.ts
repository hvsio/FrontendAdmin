import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Bank } from '../bank';
import { BankService } from '../bank.service';
import { FormBuilder } from '@angular/forms';

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
    console.log(this.bank);
    this.dialog.close();
  }

  onNo() {
    this.dialog.close();
  }

  ngOnInit() {
  }

}
