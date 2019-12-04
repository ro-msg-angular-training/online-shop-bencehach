import {Injectable} from '@angular/core';

import {Observable, of} from 'rxjs';

import {Product} from './product';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ProductService {

  private productsUrl = 'http://localhost:3000/products/';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.productsUrl + id);
  }

  updateProduct(product: Product, id: number): Observable<any> {
    return this.http.put(this.productsUrl + id, product, this.httpOptions);
  }

  deleteProduct(product: Product, id: number): Observable<Product> {
    return this.http.delete<Product>(this.productsUrl + id, this.httpOptions);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, product, this.httpOptions);
  }
}
