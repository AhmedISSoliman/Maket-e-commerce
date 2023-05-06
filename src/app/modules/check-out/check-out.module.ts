import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { CheckOutRoutingModule } from './check-out-routing.module';
import { CheckOutComponent } from './check-out/check-out.component';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [
    CheckOutComponent
  ],
  imports: [
    CommonModule,
    CheckOutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxSpinnerModule,
    RouterModule,
    HttpClientModule,
    ToastrModule,
    SharedModule

  ],
  exports: [
    CommonModule,
    CheckOutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxSpinnerModule,
    RouterModule,
    HttpClientModule,
    ToastrModule,
    SharedModule

  ],
  providers: [

  ]
})
export class CheckOutModule { }
