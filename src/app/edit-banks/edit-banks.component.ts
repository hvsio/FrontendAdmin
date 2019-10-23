import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { BankService } from '../bank.service';
import { Bank } from '../bank';
import { BANKS } from '../list';
import { ActivatedRoute } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { reject } from 'q';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';



@Component({
  selector: 'app-edit-banks',
  templateUrl: './edit-banks.component.html',
  styleUrls: ['./edit-banks.component.css']
})
export class EditBanksComponent implements OnInit {

  constructor (private service: BankService) { }

  banks:any;
  banks$: Observable<Bank[]>;
  displayedColumns: string[] = ['name', 'pageurl', 'fromCurrency', 'country'];
  promise: boolean;

  // getBanks() {
  //   this.banks=this.route.snapshot.data.banks;
  //   console.log(this.banks);
  //   this.promise = true;
  // }
  
  getBanks() {
    this.service.getBanks().subscribe(
      res => {
        this.banks = new MatTableDataSource();
        this.banks.data = res;
        console.log(this.banks.data);
      }
    )
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
