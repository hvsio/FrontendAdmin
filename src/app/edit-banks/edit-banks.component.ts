import { Component, OnInit, Inject, PACKAGE_ROOT_URL } from '@angular/core';
import { BankService } from '../bank.service';
import { Bank } from '../bank';

import { BankDetailsComponent } from '../bank-details/bank-details.component';
import { DeleteWindowComponent } from '../delete-window/delete-window.component';

import { MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-edit-banks',
  templateUrl: './edit-banks.component.html',
  styleUrls: ['./edit-banks.component.css']
})
export class EditBanksComponent implements OnInit {

  constructor(private service: BankService, private registry: MatIconRegistry,
              private domSanitizer: DomSanitizer, private dialog: MatDialog) {
    this.registry.addSvgIcon(`deleteN1`, this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/deleteN1.svg'));
  }

  banks: any;
  displayedColumns: string[] = ['name', 'pageurl', 'fromCurrency', 'country', 'delete'];
  isLoading = true;

  openDeleteDialog(bank: Bank) {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  dialogConfig.width = '30%';
  dialogConfig.data = bank;
  const dialogRef = this.dialog.open(DeleteWindowComponent, dialogConfig);
  dialogRef.afterClosed().subscribe(
    async data => {
      await this.delay(500);
      this.getBanks(); }
  );
  }

  getBanks() {
    this.service.getBanks().subscribe(
      res => {
        this.banks = new MatTableDataSource();
        this.banks.data = res;
        this.isLoading = false;
      }
    );
  }

  openDialog(bank: Bank): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = {
      id: bank.id,
      name: bank.name,
      country: bank.country,
      pageurl: bank.pageurl,
      fromCurrency: bank.fromCurrency,
      toCurrencyXpath: bank.toCurrencyXpath,
      buyxpath: bank.buyxpath,
      sellxpath: bank.sellxpath,
      unit: bank.unit,
      iscrossinverted: bank.iscrossinverted,
      exchangeunitxpath: bank.exchangeunitxpath
    };
    const dialogRef = this.dialog.open(BankDetailsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      async data => {
        await this.getBanks();
      }
  );
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  ngOnInit() {
   this.getBanks();
  }

}


