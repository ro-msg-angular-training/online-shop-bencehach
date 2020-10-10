import {ActionReducerMap} from '@ngrx/store';

import {routerReducer} from '@ngrx/router-store';
import {productReducer} from './product.reducer';
import {AppState} from '../../product';

export const appReducers: ActionReducerMap<AppState, any> = {
  router: routerReducer,
  productsList: productReducer
};
