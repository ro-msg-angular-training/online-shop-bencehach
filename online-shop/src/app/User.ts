import {Cart} from './OrderInput';
import {Role} from './Role';

export class User {

  username: string;
  password: string;
  fullName: string;
  role: Role;
  cart: Cart[];
  token?: string;
  emailAddress: string;

  constructor(username: string, password: string, fullName: string, role: { id: number; roleName: string }, cart: Cart[], emailAddress: string) {
    this.username = username;
    this.password = password;
    this.fullName = fullName;
    this.role = role;
    this.cart = cart;
    this.emailAddress = emailAddress;
  }
}
