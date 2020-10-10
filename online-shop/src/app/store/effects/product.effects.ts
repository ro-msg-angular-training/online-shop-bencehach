import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import * as ProductListActions from '../actions/product.actions';
import {Store} from '@ngrx/store';
import {AppState, Product} from '../../product';
import {ProductService} from '../../product.service';
import {map, mergeMap, switchMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {GetProduct} from '../actions/product.actions';


@Injectable()
export class ProductEffects {

  constructor(
    private _actions$: Actions,
    // private store: Store<{ productList: { products: Product[] } }>,
    // private store: Store<AppState>,
    private productService: ProductService
  ) {
  }

  @Effect()
  getProducts = createEffect( () => this._actions$.pipe(
    ofType<ProductListActions.GetProducts>(ProductListActions.GET_PRODUCTS),
    mergeMap(() => this.productService.getProducts()
      .pipe(
        map(products => ({ type: ProductListActions.GET_PRODUCTS_SUCCESS, payload: products })),
      ))

  ));


  @Effect()
  deleteProduct = createEffect( () => this._actions$.pipe(
    ofType<ProductListActions.DeleteProduct>(ProductListActions.DELETE_PRODUCT),
    switchMap((action) => this.productService.deleteProduct(action.payload.id)
      .pipe(
        map(products => ({ type: ProductListActions.GET_PRODUCTS_SUCCESS, payload : {product: products ,id: products.id } })),
        // map(()=> ({ type: ProductListActions.DELETE_SUCCESS })),
      ))
  ));

  @Effect()
  getProduct = createEffect(() => this._actions$.pipe(
    ofType<GetProduct>(ProductListActions.GET_PRODUCT),
    switchMap((action) => this.productService.getProduct(action.id)
      .pipe(
        map(product => ({type: ProductListActions.GET_PRODUCT_SUCCESS, payload: product}),
        ))
    ))
  );

}
