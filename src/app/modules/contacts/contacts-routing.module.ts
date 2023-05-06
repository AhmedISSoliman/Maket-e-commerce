import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContatcsComponent } from './contatcs/contatcs.component';

const routes: Routes = [
  {
    path: '',
    component: ContatcsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
