import {initialProductState, IProductState} from './store/state/product.state';
import {RouterReducerState} from '@ngrx/router-store';

export class Product {

  constructor(id: number, category: string, name: string, price: number, description: string, image: string) {
  }

  id: number;
  categoryName: string;
  productName: string;
  price: number;
  description: string;
  image: string;
}

export interface AppState {
  productsList: IProductState;
  router?: RouterReducerState
}

export const initialAppState: AppState = {
  productsList: initialProductState,
};

export function getInitialState(): AppState {
  return initialAppState;
}
