import {Product} from './product';
import {Cart} from './OrderInput';

export class User {

  username: string;
  password: string;
  fullName: string;
  roles: string[];
  cart: Cart[];
  token?: string;
}
