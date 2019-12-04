import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductComponent} from './product/product.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {ProductEditComponent} from './product-edit/product-edit.component';
import {LogInComponent} from './log-in/log-in.component';
import {AuthGuardService} from './guards/auth-guard.service';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

const routes: Routes = [

  {
    path: 'products',
    component: ProductComponent,
    // canActivate: [AuthGuardService]
  },
  {path: 'login', component: LogInComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'pagenf', component: PageNotFoundComponent},
  // {path: 'detail/:id', component: ProductDetailComponent , canActivate: [AuthGuardService]},
  // {path: 'edit/:id', component: ProductEditComponent , canActivate: [AuthGuardService]},
  // {path: 'add', component: ProductEditComponent , canActivate: [AuthGuardService]},
  // {path: 'shopping-cart', component: ShoppingCartComponent, canActivate:[AuthGuardService]} ,


  {path: 'shopping-cart', component: ShoppingCartComponent} ,
  {path: 'detail/:id', component: ProductDetailComponent},
  {path: 'edit/:id', component: ProductEditComponent},
  {path: 'add', component: ProductEditComponent  },

  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
