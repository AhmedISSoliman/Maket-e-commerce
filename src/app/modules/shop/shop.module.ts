import { NgModule } from '@angular/core';
import { ShopComponent } from './shop/shop.component';
import { ShopRoutingModule } from './shop-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [
    ShopComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxSpinnerModule,
    RouterModule,
    HttpClientModule,
    ToastrModule,
    NgxSliderModule,
    NgSelectModule


  ],
  exports: [
    ShopRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxSpinnerModule,
    RouterModule,
    CommonModule,
    HttpClientModule,
    ToastrModule,
    NgxSliderModule,
    NgSelectModule


  ]
})
export class ShopModule { }
