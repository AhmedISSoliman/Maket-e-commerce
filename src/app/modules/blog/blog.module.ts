import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog/blog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { BlogRoutingModule } from './blog-routing.module';


@NgModule({
  declarations: [
    BlogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxSpinnerModule,
    RouterModule,
    HttpClientModule,
    ToastrModule,
    NgxSliderModule,
    BlogRoutingModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxSpinnerModule,
    RouterModule,
    HttpClientModule,
    ToastrModule,
    NgxSliderModule,
    BlogRoutingModule
  ]
})
export class BlogModule { }
