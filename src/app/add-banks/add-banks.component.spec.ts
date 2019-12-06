import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddBanksComponent} from './add-banks.component';
import {BankService} from '../services/bank.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {By} from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';


fdescribe('AddBanksComponent', () => {
  let component: AddBanksComponent;
  let fixture: ComponentFixture<AddBanksComponent>;
  let service: BankService;
  let snackbar: MatSnackBar;
  let http: HttpClient;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [AddBanksComponent],
      imports: [MatSnackBarModule, MatInputModule, MatSelectModule, HttpClientModule, BrowserAnimationsModule],
      providers: [BankService, HttpClientModule]

    });
    fixture = TestBed.createComponent(AddBanksComponent);
    component = fixture.componentInstance;
    service = TestBed.get(BankService);
    snackbar = TestBed.get(MatSnackBar);
    http = TestBed.get(HttpClient);
  }));

  fit('should create', () => {
    fixture = TestBed.createComponent(AddBanksComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  fit('should click', () => {
    const add = new AddBanksComponent(service, snackbar);
    const button = fixture.debugElement.query(By.css('button')).triggerEventHandler('click', null);
    fixture.detectChanges();
  });

  fit('form invalid when empty', () => {
    const name = fixture.debugElement.query(By.css('#name'));
    name.nativeElement.value = 'name';
  });




    //  booleans = component.addBank('Danske Bank', 'DK',
    //   'http://danskebank.dk', 'DKK',
    //   'abcdefghijklm', 'abcdefghijklm',
    //   '', 'M100');
    // expect(component.addedToDB).toEqual(false);
    // expect(component.bankExistsinDB).toEqual(false);
    //
    // fixture.componentInstance.addBank('Danske Bank', 'DK',
    //   'http://danskebank.dk', 'DKK',
    //   'abcdefghijklm', '',
    //   'abcdefghijklm', 'M100');
    // expect(fixture.componentInstance.addedToDB).toEqual(false);
    // expect(fixture.componentInstance.bankExistsinDB).toEqual(false);
    //
    // fixture.componentInstance.addBank('Danske Bank', 'DK',
    //   'http://danskebank.dk', 'DKK',
    //   '', 'abcdefghijklm',
    //   'abcdefghijklm', 'M100');
    // expect(fixture.componentInstance.addedToDB).toEqual(false);
    // expect(fixture.componentInstance.bankExistsinDB).toEqual(false);
    //
    // fixture.componentInstance.addBank('Danske Bank', 'DK',
    //   'http://danskebank.dk', '',
    //   'abcdefghijklm', 'abcdefghijklm',
    //   'abcdefghijklm', 'M100');
    // expect(fixture.componentInstance.addedToDB).toEqual(false);
    // expect(fixture.componentInstance.bankExistsinDB).toEqual(false);
    //
    // fixture.componentInstance.addBank('Danske Bank', 'DK',
    //   '', 'DKK',
    //   'abcdefghijklm', 'abcdefghijklm',
    //   'abcdefghijklm', 'M100');
    // expect(fixture.componentInstance.addedToDB).toEqual(false);
    // expect(fixture.componentInstance.bankExistsinDB).toEqual(false);
    //
    // fixture.componentInstance.addBank('Danske Bank', '',
    //   'http://danskebank.dk', 'DKK',
    //   'abcdefghijklm', 'abcdefghijklm',
    //   'abcdefghijklm', 'M100');
    // expect(fixture.componentInstance.addedToDB).toEqual(false);
    // expect(fixture.componentInstance.bankExistsinDB).toEqual(false);
    //
    // fixture.componentInstance.addBank('', 'DK',
    //   'http://danskebank.dk', 'DKK',
    //   'abcdefghijklm', 'abcdefghijklm',
    //   'abcdefghijklm', 'M100');
    // expect(fixture.componentInstance.addedToDB).toEqual(false);
    // expect(fixture.componentInstance.bankExistsinDB).toEqual(false);

  // fit('should reject the bank - already exists in DB', () => {
  //
  //   fixture.componentInstance.addBank('Danske Bank', 'DK',
  //     'http://danskebank.dk', 'DKK',
  //     'abcdefghijklm', 'abcdefghijklm',
  //     'abcdefghijklm', 'M100');
  //
  //   fixture.componentInstance.addBank('Danske Bank', 'DK',
  //     'http://danskebank.dk', 'DKK',
  //     'abcdefghijklm', 'abcdefghijklm',
  //     'abcdefghijklm', 'M100');
  //
  //   expect(fixture.componentInstance.addedToDB).toEqual(false);
  //   expect(fixture.componentInstance.bankExistsinDB).toEqual(true);
  // });
  //
  // fit('should add the bank', () => {
  //
  //   fixture.componentInstance.addBank('Danske Bank', 'DK',
  //     'http://danskebank.dk', 'DKK',
  //     'abcdefghijklm', 'abcdefghijklm',
  //     'abcdefghijklm', 'M100');
  //
  //   expect(fixture.componentInstance.addedToDB).toEqual(true);
  //   expect(fixture.componentInstance.bankExistsinDB).toEqual(true);
  // });


});

