import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBanksComponent } from './add-banks/add-banks.component';
import { EditBanksComponent } from './edit-banks/edit-banks.component';
import { AppComponent } from './app.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { NoPageComponent } from './no-page/no-page.component';

const routes: Routes = [
  { path: 'add', component: AddBanksComponent },
  { path: 'edit', component: EditBanksComponent},
  { path: '', redirectTo: '/edit', pathMatch: 'full'},
  { path: 'edit/details/:id', component: BankDetailsComponent},
  { path: '**', component: NoPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }