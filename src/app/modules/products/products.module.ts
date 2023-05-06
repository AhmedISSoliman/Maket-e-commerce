import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { TrendingProductsComponent } from './trending-products/trending-products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from '@angular/router';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SharedModule } from '../shared.module';
import { NumberToWordsPipe } from './number-to-words.pipe';

@NgModule({
  declarations: [
    ProductsComponent,
    TrendingProductsComponent,
    ProductDetailsComponent,
    NumberToWordsPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxSpinnerModule,
    RouterModule,
    ProductsRoutingModule,
    SharedModule],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
    NgxSpinnerModule,
    RouterModule,
    ProductsRoutingModule,
    SharedModule
  ]
})
export class ProductsModule { }
