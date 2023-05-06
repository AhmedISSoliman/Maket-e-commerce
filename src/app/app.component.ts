import { Component, OnInit } from '@angular/core';
import { CartService } from './shared/services/cart.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, of, map, tap, take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  firstFormGroup = this.formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this.formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;
  constructor(private cart: CartService, private formBuilder: FormBuilder) {
    this.cart.getCartFromLocalStorage();
    this.cart.getWishListFromLocalStorage();
  }
  ngOnInit(): void {

  }
  title = 'E-Commerce';
}
