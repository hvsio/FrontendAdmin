import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AddBanksComponent } from './add-banks/add-banks.component';
import { EditBanksComponent } from './edit-banks/edit-banks.component';

import { BankDetailsComponent } from './bank-details/bank-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { NoPageComponent } from './no-page/no-page.component';
import { ConfigureComponent } from './configure/configure.component';
import { MatIconModule } from '@angular/material/icon';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DeleteWindowComponent } from './delete-window/delete-window.component';


@NgModule({
  declarations: [
    AppComponent,
    AddBanksComponent,
    EditBanksComponent,
    BankDetailsComponent,
    NoPageComponent,
    ConfigureComponent,
    DeleteWindowComponent,
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
    MatSnackBarModule
  ],
  entryComponents: [BankDetailsComponent, DeleteWindowComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
