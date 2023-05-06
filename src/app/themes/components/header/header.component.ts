import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import { NavigationEnd, NavigationStart, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  CartQuantity$: Observable<number> | undefined;
  allAmount$: Observable<any> | undefined;
  currentRoute!: string;
  wishListCount$!: Observable<any>;
  // isActive!: boolean;
  constructor(private cartService: CartService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.CartQuantity$ = this.cartService.cartCount$;
    this.allAmount$ = this.cartService.allAmountAction$;
    this.wishListCount$ = this.cartService.wishListCountAction$;
  }

}
