import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { toArabicWord, inWords } from '../../../../assets/js/to-word-with-langs.js';
import n2words from 'n2words'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  data: any;
  vard: any; user: any = {}
  num: any;
  text: any;
  constructor(

    private router: Router
  ) {
    // console.log(toArabicWord(1850.23))
    // console.log(inWords(1850.23))
  }

  ngOnInit(): void {
    this.data = '';
    this.num = 524.25;
    // this.text = n2words(this.num, { lang: 'ar' });
    this.text = n2words(this.num, { lang: 'en' }).replace("-", " ").replace("-", " ");
  }


  navigateToShop() {
    this.router.navigate(['/shop'])
  }
  onSubmitTemplateBased(e: any) {
    this.user.name = e.firstName;
    this.user.password = e.password;
  }

}
