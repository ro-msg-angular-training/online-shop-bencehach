import {Product} from '../../product';

export interface IProductState {
  productsList: Product[];
  selectedProduct: Product;
}

export const initialProductState: IProductState =
{
  productsList: [],
  selectedProduct: null
};
