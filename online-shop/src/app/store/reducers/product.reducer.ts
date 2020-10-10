import * as ProductListActions from '../actions/product.actions';
import {initialProductState, IProductState} from '../state/product.state';


export function productReducer  (state = initialProductState, action: ProductListActions.ProductActions ):IProductState {
{
  switch (action.type) {
    case ProductListActions.ADD_PRODUCT:
      return {
        ...state,
        productsList: [...state.productsList, action.payload]
      };
    case ProductListActions.ADD_PRODUCTS:
      return {
        ...state,
        productsList: [...state.productsList, ...action.payload]
      };
    case ProductListActions.UPDATE_PRODUCT:

      const product = state.productsList[action.payload.id];
      const updateProduct = {
        ...product,
        ...action.payload.product
      };

      const updateProducts = [...state.productsList];
      updateProducts[action.payload.id] = updateProduct;

      return {
        ...state,
        productsList: updateProducts
      };

    case ProductListActions.DELETE_PRODUCT:

      return {
        ...state,
        productsList: state.productsList.filter((p) => {
                  return p.id !== action.payload.id;
        })
      };

    case ProductListActions.DELETE_SUCCESS: {
      return {
        ...state,
      };
    }

    case ProductListActions.GET_PRODUCTS_SUCCESS: {
      debugger
      return {
        ...state,
        productsList: action.payload
      };
    }

    case ProductListActions.GET_PRODUCT_SUCCESS: {
      return {
        ...state,
        selectedProduct: action.payload
      };
    }

    default:
      return state;
  }
}
}
