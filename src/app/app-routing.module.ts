import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './account/login/login.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'products',
        loadChildren: () => import('../app/modules/products/products.module').then((m) => m.ProductsModule),
        title: 'home'
      },
      {
        path: 'shop',
        loadChildren: () => import('../app/modules/shop/shop.module').then((m) => m.ShopModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('../app/modules/cart/cart.module').then((m) => m.CartModule)
      },
      {
        path: 'check-out',
        loadChildren: () => import('../app/modules/check-out/check-out.module').then((m) => m.CheckOutModule)
      },
      {
        path: 'blog',
        loadChildren: () => import('../app/modules/blog/blog.module').then((m) => m.BlogModule)
      },
      {
        path: 'pages',
        loadChildren: () => import('../app/modules/pages/pages.module').then((m) => m.PagesModule)
      },
      {
        path: 'contacts',
        loadChildren: () => import('../app/modules/contacts/contacts.module').then((m) => m.ContactsModule)
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})

export class AppRoutingModule { }
