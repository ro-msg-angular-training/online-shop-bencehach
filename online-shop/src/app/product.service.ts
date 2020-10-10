import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';

import {Product} from './product';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Email} from './Email';

@Injectable({providedIn: 'root'})
export class ProductService {

  private productsUrl = 'http://localhost:8080/products/';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient,) {
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

  deleteProduct(id: number) {
    return this.http.delete<any>(this.productsUrl + id, this.httpOptions);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, product, this.httpOptions);
  }

  sendEmail(productId: Email): Observable<Email> {
    debugger
    return this.http.post<Email>('http://localhost:8080/email',  productId, this.httpOptions);
  }
}
