import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatInputModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {FormBuilder } from '@angular/forms';

import { BankDetailsComponent } from './bank-details.component';
import {BankService} from '../services/bank.service';
import {HttpClientModule} from '@angular/common/http';
import {Bank} from '../models/Bank';
import {OverlayContainer} from '@angular/cdk/overlay';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';


fdescribe('BankDetailsComponent', () => {
  let component: BankDetailsComponent;
  let fixture: ComponentFixture<BankDetailsComponent>;
  let service: BankService;
  let data: Bank;
  let fb: FormBuilder;
  let dialog: MatDialogRef<BankDetailsComponent>;
  data = {
    name: 'Nordea',
    country: 'DK',
    pageurl: 'http://n.dk',
    buyxpath: 'abc',
    sellxpath: 'abc',
    fromCurrency: 'DKK',
    toCurrencyXpath: 'abc',
    unit: 'M100',
    id: 'abc',
    iscrossinverted: true,
    exchangeunitxpath: 'abc'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BankDetailsComponent],
      imports: [MatInputModule, MatButtonModule, MatSelectModule,
        BrowserAnimationsModule, FormsModule,  ReactiveFormsModule, MatDialogModule, HttpClientModule],
      providers: [BankService, HttpClientModule, { provide: MAT_DIALOG_DATA, useValue: data },
        { provide: MatDialogRef }, OverlayContainer],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    });
    service = TestBed.get(BankService);
    fb = TestBed.get(FormBuilder);
    dialog = TestBed.get(MatDialogRef);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



  fit('should create', () => {
    expect(component).toBeTruthy();
  });

});
