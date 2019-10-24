import { Component, OnInit, Inject, PACKAGE_ROOT_URL } from '@angular/core';
import { BankService } from '../bank.service';
import { Bank } from '../bank';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { BankDetailsComponent } from '../bank-details/bank-details.component';




@Component({
  selector: 'app-edit-banks',
  templateUrl: './edit-banks.component.html',
  styleUrls: ['./edit-banks.component.css']
})
export class EditBanksComponent implements OnInit {

  constructor (private service: BankService, private registry:MatIconRegistry, private domSanitizer: DomSanitizer, private dialog: MatDialog) { 
    this.registry.addSvgIcon(`deleteN1`, this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/deleteN1.svg'));
  }

  banks:any;
  displayedColumns: string[] = ['name', 'pageurl', 'fromCurrency', 'country', 'delete'];
  promise: boolean;

  async onClickDelete(bank: Bank) {
    this.service.deleteBank(bank.id).subscribe();
    this.getBanks();
    await this.delay(1000);
    console.log(this.banks.data);
    
  }

  editBank(bank: Bank) {
    console.log(bank);
  }
  
  getBanks() {
    this.service.getBanks().subscribe(
      res => {
        this.banks = new MatTableDataSource();
        this.banks.data = res;
      }
    )
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

openDialog(bank: Bank): void {

  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  dialogConfig.width = "60%";
  dialogConfig.data = {id: bank.id, name: bank.name, country: bank.country, pageurl: bank.pageurl, fromCurrency: bank.fromCurrency, toCurrencyXpath: bank.toCurrencyXpath, buyxpath: bank.buyxpath, sellxpath: bank.sellxpath, unit: bank.unit}; 

  this.dialog.open(BankDetailsComponent, dialogConfig);

}

  // deleteBank(bankId: number) {
  //   this.service.deleteBank(bankId)
  //     .subscribe(
  //       data => console.log(`${bankId} deleted`),
  //       err => console.error(err)
  //     );
  // }

  // getBanks() {
  //   this.service.getBanks()
  //   .subscribe (
  //     (data:Bank[]) => {
  //       for (let i in data) {
  //         var bankie = new Bank(data[i].name, data[i].country, data[i].pageurl, data[i].buyxpath, data[i].sellxpath, data[i].fromCurrency, data[i].toCurrencyXpath);
  //         this.banks.push(bankie);
  //       } 
       
  //     },
  //     err => console.error(err)
  //   )
  //   console.log(this.banks$);
  //   console.log(this.banks);
  // }
  ngOnInit() {
   this.getBanks();
  }

}

// @Component({
//   selector: 'single-edit-dialog',
//   templateUrl: 'single-edit-dialog.html',
// })
// export class SingleEditDialog {

//   constructor(
//     public dialog: MatDialogRef<SingleEditDialog>,
//     @Inject(MAT_DIALOG_DATA) public bank: Bank) {}

//   onNoClick(): void {
//     this.dialog.close();
//   }


