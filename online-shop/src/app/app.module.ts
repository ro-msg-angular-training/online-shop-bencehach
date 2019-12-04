import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ProductComponent} from './product/product.component';
import {FormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {ProductEditComponent} from './product-edit/product-edit.component';
import {ProductAddComponent} from './product-add/product-add.component';
import {ReactiveFormsModule} from '@angular/forms';
import {LogInComponent} from './log-in/log-in.component';
import {JwtInterceptor} from './jws.interceptors';
import {ErrorInterceptor} from './error.interceptors';
import {AuthenticationService} from './authentication.service';
import {AuthGuard} from './auth.guard';
import {RouterModule} from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductAddComponent,
    LogInComponent,
    ShoppingCartComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
