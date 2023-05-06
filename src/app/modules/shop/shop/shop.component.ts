import {
  Component, OnInit, ViewChild, ElementRef
} from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductsService } from '../../../shared/services/products.service';
import { AllProductViewModel, ProductViewModel } from './../../../shared/models/product-view.model';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { forkJoin, BehaviorSubject, combineLatest, Observable, map, catchError, EMPTY, tap, pipe } from 'rxjs';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  selectedSortOptions!: string;
  @ViewChild('number') number!: ElementRef<HTMLInputElement>;
  productList: ProductViewModel[] = [];
  productLess: ProductViewModel[] = [];
  productMore: ProductViewModel[] = [];
  sortedProducts: ProductViewModel[] = [];
  sortedProducts$: Observable<any[]> | undefined;
  productList$: Observable<ProductViewModel[]> | undefined;
  // cartItems: ProductViewModel[] = [];
  value: number = 0;
  priceFrom: number = 0;
  priceTo: number = 1000;

  minItemQuantity: number = 1;

  listofAvailableItems: any[] = [];
  listofAvailableSizes: any[] = [];

  changeColor = [false];
  allProducts$!: Observable<ProductViewModel[]>;
  allCategories$!: Observable<string[]>;
  amountsss$: Observable<ProductViewModel[]> | undefined;

  service$: Observable<any> | undefined

  options: Options = {
    floor: this.priceFrom,
    ceil: this.priceTo,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "<b>Min price:</b> $" + value;
        case LabelType.High:
          return "<b>Max price:</b> $" + value;
        default:
          return "$" + value;
      }

    }
  };
  sortedPrices = [
    { key: 0, value: 'Display All' },
    { key: 1, value: 'High to Low' },
    { key: 2, value: 'Low to High' }
  ];
  sortingProducts = [
    { key: 0, value: 'asc' },
    { key: 1, value: 'desc' }
  ]
  constructor
    (
      private router: Router,
      private productService: ProductsService,
      private spinner: NgxSpinnerService,
      private toastr: ToastrService,
      private cartService: CartService
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
  }
  ngOnInit(): void {
    this.spinner.show();
    this.getAllProducts();
    this.getAllCategories();
    this.cartService.currentCartItems$;
    this.spinner.hide();
  };

  /**
   * used to get all products
   */
  getAllProducts() {
    this.sortedProducts$ = this.productService.allProduct$.pipe(
      map(items =>
        items.map(item => ({
          ...item,
          amount: 1,
          size: 'sm',
          isWishList: false
        }))
      ));
    this.productList$ = this.productService.allProduct$.pipe(
      map(res => res.map(result => ({
        ...result,
        amount: 1,
        size: 'sm',
        isWishList: false
      }))),
      catchError(err => {
        return EMPTY;
      })
    )
  }

  // getLessProduct() {
  //   this.spinner.show();
  //   this.productService.lessProducts$.subscribe(res => {
  //     this.spinner.hide();
  //     this.productLess = res;
  //   })
  // }
  // getMoreProduct() {
  //   this.spinner.show();
  //   this.productService.moreProducts$.subscribe(res => {
  //     this.spinner.hide();
  //     this.productMore = res
  //   })
  // }

  /**
   * used to get all categories
   */
  getAllCategories() {
    this.spinner.show();
    this.allCategories$ = this.productService.getAllCategories();
    this.spinner.hide();
  }
  /**
   * used to get products in category
   * @param item category name
   */
  getProductInCategory(item: string) {
    this.spinner.show();
    if (item) {
      this.sortedProducts$ = this.productService.getProductInCategory(item).pipe(
        map(items => items.map(item => ({
          ...item,
          amount: 1,
          size: 'sm',
        })))
      );
      this.spinner.hide();
    }
  }
  /**
   * used to navigate to product details page
   * @param productId product index
   */
  navigateToDetails(productId: number) {
    this.router.navigate([`products/product-details/${productId}`])
  }
  addToCart(product: any) {
    if (this.checkMinAndMaxValue(product.amount)) {
      this.cartService.addToCart(product);
    }
    else {
      return;
    }
  };

  /**
 * sorted products by price
 */
  sortAscProducts() {
    this.sortedProducts$ = this.sortedProducts$?.pipe(
      map(items => items.sort((a, b) => (a.price > b.price) ? 1 : (a.price === b.price) ? ((a.price > b.price) ? 1 : -1) : -1))
    )
  }
  sortDesProducts() {
    this.sortedProducts$ = this.sortedProducts$?.pipe(
      map(items => items.sort((a, b) => (a.price > b.price) ? -1 : (a.price === b.price) ? ((a.price > b.price) ? -1 : 1) : 1))
    )
  }
  sortByPriceChanged(value: any) {
    switch (value) {
      case "0":
        this.getAllProducts();
        break;
      case "1":
        this.sortDesProducts();
        break;
      case "2":
        this.sortAscProducts();
        break;
    }
  };

  /**
  * filtered products by price
  */
  filterBy(e) {
    this.spinner.show();
    this.sortedProducts$ = this.productList$?.pipe(map(items => items.filter(item =>
      item.price >= e.value && item.price <= e.highValue
    )));
    this.spinner.hide();
  }
  checkMinAndMaxValue(e: any) {
    if (e < this.minItemQuantity || e == null) {
      this.toastr.error(`Amount can't be less than ${this.minItemQuantity}`, 'Error');
      return false;
    }
    return true;
  }
  checkMinAndMaxSize(e: any) {
    if (e == '' || e == null) {
      this.toastr.error(`Size can't be empty`, 'Error');
      return false;
    }
    return true;
  }

  addToWishList(prod: any) {
    this.cartService.addToWishList(prod);
    console.log(prod)
  }
  sortChange(sort: string) {
    console.log(sort)
  }
}
