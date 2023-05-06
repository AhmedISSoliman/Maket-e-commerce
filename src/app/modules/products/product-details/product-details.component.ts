import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductViewModel } from 'src/app/shared/models/product-view.model';
import { ProductsService } from 'src/app/shared/services/products.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productId!: number;
  // amount: number = 1;
  productDetails!: ProductViewModel;
  // cartItem: any[] = [];
  constructor(private activeRoute: ActivatedRoute,
    private productService: ProductsService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.productId = Number(this.activeRoute.snapshot.paramMap.get('id'));
    this.spinner.show();
    this.productService.getProductById(this.productId).subscribe(res => {
      this.spinner.hide();
      this.productDetails = res;
    })
  }
  // AddtoCart() {
  //   this.cartItem = [...this.cartItem, { amount: this.amount, product: this.productDetails }];
  //   localStorage.setItem('cart', JSON.stringify(this.cartItem));

  // }
}
