import {Action} from '@ngrx/store';
import {Product} from '../../product';

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const ADD_PRODUCTS = 'ADD_PRODUCTS';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCT = 'GET_PRODUCT';
export const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS';
export const DELETE_SUCCESS = 'DELETE_SUCCESS';

export class AddProduct implements Action
{
  readonly type = ADD_PRODUCT;
  constructor(public payload: Product) {
  }
}

export class AddProducts implements Action{

  readonly type = ADD_PRODUCTS;

  constructor(public payload: Product[]) {}
}

export class UpdateProduct implements Action{

  readonly type = UPDATE_PRODUCT;
  constructor(public payload: {product: Product ,id: number }) {}
}

// export class DeleteProduct implements Action{
//
//   readonly type = DELETE_PRODUCT;
//   constructor(public id: number) {}
// }
//
// export class DeleteSuccess implements Action{
//   readonly type = DELETE_SUCCESS;
//   constructor(public payload: Product) {}
// }

export class DeleteProduct implements Action{
  readonly type = DELETE_PRODUCT;
  constructor(public payload: {product: Product ,id: number }) {}
}

export class DeleteSuccess implements Action{
  readonly type = DELETE_SUCCESS;
}

export class GetProduct implements Action{

  readonly type = GET_PRODUCT;
  constructor(public id: number){}
}

export class GetProductSuccess implements Action{
  readonly type = GET_PRODUCT_SUCCESS;
  constructor(public payload: Product) {}
}

export class GetProducts implements Action{
  readonly type = GET_PRODUCTS;
}

export class GetProductsSuccess implements Action{
  readonly type = GET_PRODUCTS_SUCCESS;
  constructor(public payload: Product[]) {}
}

export type ProductActions = AddProduct | AddProducts | UpdateProduct | DeleteProduct | GetProducts | GetProductsSuccess
  | GetProduct | GetProductSuccess  | DeleteSuccess;
