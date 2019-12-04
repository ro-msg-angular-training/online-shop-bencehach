import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {User} from './user';
import {config, Observable} from 'rxjs';
import {Product} from './product';
import {Cart, OrderInput} from './OrderInput';

@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private apiUrl = 'http://localhost:3000/';

  register(user: User) {
    return this.http.post(this.apiUrl, user);
  }

  getUser(username: string): Observable<User> {
    return this.http.get<User>(this.apiUrl + 'users/' + username);
  }

  postOrder(orderInput: OrderInput) {
    return this.http.post(this.apiUrl + 'orders', orderInput, this.httpOptions);
  }

  postCart(username: string, cart: Cart[]) {
    return this.http.patch(this.apiUrl + 'users/' + username, {cart}, this.httpOptions);
  }
}
