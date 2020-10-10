import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ProductComponent} from './product/product.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ProductEditComponent} from './product-edit/product-edit.component';
import {ProductAddComponent} from './product-add/product-add.component';
import {LogInComponent} from './log-in/log-in.component';
import {JwtInterceptor} from './jws.interceptors';
import {ErrorInterceptor} from './error.interceptors';
import {RouterModule} from '@angular/router';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {StoreModule} from '@ngrx/store';
import {environment} from '../environments/environment';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {ProductEffects} from './store/effects/product.effects';
import {appReducers} from './store/reducers/app.reducer';
import { RegistrationComponent } from './registration/registration.component';


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
    RegistrationComponent,

  ],
  imports: [
    BrowserModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    EffectsModule.forRoot([ProductEffects]),
    StoreModule.forRoot(appReducers),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
