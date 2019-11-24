import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AddBanksComponent } from './add-banks/add-banks.component';
import { EditBanksComponent } from './edit-banks/edit-banks.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { NoPageComponent } from './no-page/no-page.component';
import { ConfigureComponent } from './configure/configure.component';
import { DeleteWindowComponent } from './delete-window/delete-window.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import {MatCardModule, MatInputModule} from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CountryComponent } from './components/country/country.component';
import { CurrencyComponent } from './components/currency/currency.component';
import { AddCountryComponent } from './components/add-country/add-country.component';
import { AddCurrencyComponent } from './components/add-currency/add-currency.component';
import {FeeComponent} from './components/fee/fee.component';



@NgModule({
  declarations: [
    AppComponent,
    AddBanksComponent,
    EditBanksComponent,
    BankDetailsComponent,
    NoPageComponent,
    ConfigureComponent,
    DeleteWindowComponent,
    FeeComponent,
    CountryComponent,
    CurrencyComponent,
    AddCountryComponent,
    AddCurrencyComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatChipsModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    AngularSvgIconModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [BankDetailsComponent, DeleteWindowComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
