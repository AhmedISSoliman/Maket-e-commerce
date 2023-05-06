import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './themes/components/header/header.component';
import { FooterComponent } from './themes/components/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
import { LayoutComponent } from './layout/layout.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { MatStepperModule } from '@angular/material/stepper';
import { SharedModule } from './modules/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { } from './modules/products/number-to-words.pipe';
import { LoginComponent } from './account/login/login.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    NgxSpinnerModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      closeButton: true,
      progressBar: true,
      timeOut: 2000,
    }),
    ReactiveFormsModule,
    NgxSliderModule,
    MatStepperModule,
    SharedModule,
    NgSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
