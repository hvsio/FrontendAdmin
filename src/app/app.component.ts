import { Component } from '@angular/core';
import {BankService} from './bank.service'
import { Bank } from './bank';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'front';

  constructor (private service:BankService) { }


}
