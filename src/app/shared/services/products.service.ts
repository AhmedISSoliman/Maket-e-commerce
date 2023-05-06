import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiPaths } from '../../../environments/urls';
import { Observable, of, combineLatest, merge } from 'rxjs';
import { AllProductViewModel, ProductViewModel } from './../models/product-view.model';
import { ProductInCategory } from '../models/product-in-category.model';
import { map, filter, mergeWith } from 'rxjs/operators';
import { forkJoin, pipe, concat } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  lessProducts$ = this.http.get<ProductViewModel[]>(`${environment.baseUrl}${ApiPaths.getAllProducts}`).pipe(
    map(products => products.filter(product => product.price < 100))
  );
  moreProducts$ = this.http.get<ProductViewModel[]>(`${environment.baseUrl}${ApiPaths.getAllProducts}`).pipe(
    map(products => products.filter(product => product.price > 100))
  );
  allProduct$ = combineLatest([this.lessProducts$, this.moreProducts$]).pipe(
    map((res) => res.flat())
  );
  getProductById(id: number) {
    return this.http.get<ProductViewModel>(`${environment.baseUrl}${ApiPaths.getProductById}${id}`);
  }

  getAllCategories() {
    return this.http.get<string[]>(`${environment.baseUrl}${ApiPaths.getAllCategories}`)
  }

  getProductInCategory(category: string) {
    return this.http.get<any[]>(`${environment.baseUrl}${ApiPaths.getProductInCategory}${category}`)
  }
}

  // getLessProduct(): Observable<ProductViewModel[]> {
  //   return this.http.get<ProductViewModel[]>(`${environment.baseUrl}${ApiPaths.getAllProducts}`).pipe(
  //     products.filter(product=>product.price<100)
  //     // filter(e => e[0].price < 100)
  //   )
  // }
  // getMoreProduct() {
  //   return this.http.get<ProductViewModel[]>(`${environment.baseUrl}${ApiPaths.getAllProducts}`).pipe(map(data => {
  //     return data.filter(e => e.price > 100);
  //   }))
  // }
