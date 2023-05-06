import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductViewModel } from 'src/app/shared/models/product-view.model';
import { CartService } from 'src/app/shared/services/cart.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, map } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss']
})
export class CartItemsComponent implements OnInit {
  @ViewChild('couponInput') couponInput!: ElementRef
  cartItems: any[] = [];

  minItemQuantity: number = 1;
  maxItemQuantity: number = 5;
  listofAvailableItems: any[] = [];
  listofAvailableSizes: any[] = [];
  coupon!: number;

  currentCartItems$: Observable<any[]> | undefined
  allAmount$: Observable<any> | undefined;

  isDisabled: boolean = true;
  couponForm: FormGroup | any;
  constructor(private cartService: CartService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder
  ) {
    this.listofAvailableItems = [
      { value: 1 },
      { value: 2 },
      { value: 3 },
      { value: 4 },
    ]
    this.listofAvailableSizes = [
      { value: 'xs' },
      { value: 's' },
      { value: 'm' },
      { value: 'l' },
      { value: 'xl' },
      { value: 'xxl' },
    ]

    this.couponForm = this.formBuilder.group({
      couponCode: ['']
    })
  }

  ngOnInit(): void {
    this.spinner.show();
    this.currentCartItems$ = this.cartService.currentCartItems$;
    this.allAmount$ = this.cartService.allAmountAction$
    this.spinner.hide();
  }
  deleteItemfromCart(index: number) {
    this.cartService.removeElemntFromCart(index);
    this.currentCartItems$ = this.cartService.currentCartItems$;
  }
  updateProduct(product) {
    this.cartService.addToCart(product);
  }

  checkMinAndMaxValue(e: any) {
    if (e.amount < this.minItemQuantity || e.amount == null) {
      this.toastr.error(`Amount can't be less than ${this.minItemQuantity}`, 'Error');
      this.isDisabled = false;
      return false;
    }
    this.isDisabled = true;
    this.updateProduct(e);
    return true;
  }

  checkMinAndMaxSize(e: any) {
    if (e.size == '' || e.size == null) {
      this.toastr.error(`Size can't be empty`, 'Error');
      this.isDisabled = false;
      return false;
    }
    this.isDisabled = true;
    this.updateProduct(e);
    return true;
  }

  checkCouponAvilabilty() {
    if (this.cartService.addCoupon(this.couponForm.value.couponCode)) {
      this.toastr.success('Coupon added successfully');
    }
    else {
      this.toastr.error('Coupon not valid');
    }
  }
  removeCoupon() {
    this.cartService.removeCoupon();
  }
}
