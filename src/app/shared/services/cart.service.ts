

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, combineLatest, map, tap } from 'rxjs';
import { AllProductViewModel, ProductViewModel } from '../models/product-view.model';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from './products.service';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: any[] = [];

  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  private allAmountSubject = new BehaviorSubject<any>(0);
  allAmountAction$ = this.allAmountSubject.asObservable();

  private currentCartItemsSubject = new BehaviorSubject<ProductViewModel[]>([]);
  currentCartItems$ = this.currentCartItemsSubject.asObservable();

  private wishListDetailSubject = new BehaviorSubject<any>([]);
  wishListDetailsAction$ = this.wishListDetailSubject.asObservable();

  private wishListCountSubject = new BehaviorSubject<any>(0);
  wishListCountAction$ = this.wishListCountSubject.asObservable();

  readonly listofCoupon: any = [
    { key: .1, value: 'AES14' },
    { key: .15, value: 'YASDR' }
  ];

  constructor(private tostrService: ToastrService, private productService: ProductsService) {
    this.currentCartItemsSubject.next(
      JSON.parse(localStorage.getItem('cart')!) == null ? [] : JSON.parse(localStorage.getItem('cart')!)
    );
  }

  getCartFromLocalStorage(): any[] {
    var result: any[] = [];
    var items = localStorage.getItem('cart')!;
    if (items != null) {
      result = JSON.parse(items);
      this.cartItems = result;
      this.currentCartItemsSubject.next(result);
      this.cartCount.next(result.length);
      this.calculateTotalAmount();
      let coupon = localStorage.getItem('coupon');
      if (coupon) {
        this.addCoupon(JSON.parse(coupon).value);
      }
    }
    return result;
  }
  /**
 * Used to add items to cart
 * @param product current product
 */
  addToCart(product: any) {
    this.calculateTotalAmount();
    let exist = this.cartItems.find(item => item.item.id == product.id && item.item.size == product.size);
    if (exist) {
      exist.quantity = product.amount;
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
      this.currentCartItemsSubject.next(this.cartItems);
      this.calculateTotalAmount();
    }
    else {
      this.cartItems.push({ item: product, quantity: product.amount });
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
      this.currentCartItemsSubject.next(this.cartItems);
      this.cartCount.next(this.cartItems.length);
      this.calculateTotalAmount();
    }
  }

  removeElemntFromCart(index: number) {
    // let dataInStorage: ProductViewModel[] = this.currentCartItems.value;
    this.cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.currentCartItemsSubject.next(this.cartItems);
    this.calculateTotalAmount();
    this.cartCount.next(this.cartItems.length);
  }

  calculateTotalAmount() {
    let temp = 0;
    this.cartItems?.forEach(e => {
      temp += e?.item?.price * e?.item?.amount;
    });
    this.allAmountSubject.next({
      subTotal: temp,
      taxTotal: (.14 * temp),
      totalAmount: (temp + (.14 * temp))
    })

  }
  addCoupon(couponValue: any) {
    const coupon = this.listofCoupon.find(e => e.value == couponValue);
    if (coupon) {
      const totalData = this.allAmountSubject.getValue();
      totalData.coupon = (totalData.taxTotal + totalData.subTotal) * coupon.key;
      totalData.totalAmount = (totalData.taxTotal + totalData.subTotal) - totalData.coupon;
      this.allAmountSubject.next(totalData);
      localStorage.setItem('coupon', JSON.stringify(coupon));
      return true;
    }
    else {
      return false;
    }

  }
  removeCoupon() {
    const totalData = this.allAmountSubject.getValue();
    totalData.totalAmount = totalData.totalAmount + totalData.coupon;
    totalData.coupon = 0;
    this.allAmountSubject.next(totalData);
    localStorage.removeItem('coupon');
  }
  getWishListFromLocalStorage() {
    let wishListData = this.wishListDetailSubject.getValue();
    let result: any[] = [];
    let items = localStorage.getItem('wishList');
    if (items != null) {
      result = JSON.parse(items);
      wishListData.push(result);
      this.wishListDetailSubject.next(wishListData);
      this.wishListCountSubject.next(result.length);
    }
  }

  addToWishList(product) {
    let wishListData = this.wishListDetailSubject.getValue();

    let exist = wishListData?.find(item => item.id == product.id);
    if (exist) {
      exist.isWishList = product.isWishList == !true;
      wishListData.filter(item=>item.id!=product.id)
      localStorage.setItem('wishList', JSON.stringify(wishListData));
      this.wishListDetailSubject.next(wishListData);
      this.wishListCountSubject.next(wishListData.length);
    }
    else {
      wishListData.push(product);
      localStorage.setItem('wishList', JSON.stringify(wishListData));
      this.wishListDetailSubject.next(wishListData);
      this.wishListCountSubject.next(wishListData.length);
    }
  }
}
