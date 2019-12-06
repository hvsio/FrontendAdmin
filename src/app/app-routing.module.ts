import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AddBanksComponent} from './add-banks/add-banks.component';
import {EditBanksComponent} from './edit-banks/edit-banks.component';
import {NoPageComponent} from './no-page/no-page.component';
import {ConfigureComponent} from './configure/configure.component';

const routes: Routes = [
  {path: 'add', component: AddBanksComponent},
  {path: 'edit', component: EditBanksComponent},
  {path: '', redirectTo: '/edit', pathMatch: 'full'},
  {path: 'configure', component: ConfigureComponent},
  {path: '**', component: NoPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
