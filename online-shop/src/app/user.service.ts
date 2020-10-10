import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './user';
import {Observable} from 'rxjs';
import {Cart, OrderInput} from './OrderInput';
import {Role} from './Role';

@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private apiUrl = 'http://localhost:8080/';

  getUser(username: string): Observable<User> {
    return this.http.get<User>(this.apiUrl + 'users/' + username);
  }

  postOrder(orderInput: OrderInput) {
    return this.http.post(this.apiUrl + 'orders', orderInput, this.httpOptions);
  }

  postCart(username: string, cart: Cart[]) {
    return this.http.patch(this.apiUrl + 'users/' + username, {cart}, this.httpOptions);
  }

  deleteFromCart(productId: number, username: string) {
    return this.http.delete(this.apiUrl + 'cart/' + productId + '/' + username);
  }

  deleteCartAfterCheckout(username: string) {
    return this.http.delete(this.apiUrl + 'cart/' + username);
  }

  register(username: string, password: string, fullName: string, emailAddress: string, role: Role,cart: Cart[]) {
    return this.http.post<User>(this.apiUrl + 'users/', {username, password, fullName, emailAddress, role, cart}, this.httpOptions);
  }
}
