import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {ProductService} from '../product.service';
import {Product} from '../product';
import {UserService} from '../user.service';
import {Cart} from '../OrderInput';
import {Store} from '@ngrx/store';
import {Stock} from '../Stock';
import {StockService} from '../stock.service';
import {Email} from '../Email';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product;
  showModal = false;
  isAdmin = false;
  email: Email;
  stocks: Stock[] = [];
  cart: Cart[] = [];
  isAvb = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location,
    private userService: UserService,
    private store: Store<{ productList: { products: Product[] } }>,
    private stockService: StockService
  ) {
  }


  ngOnInit(): void {
    this.getProduct();
    this.getRoles();
    this.getStocks();
  }

  getStocks(): void {
    this.stockService.getStocks().subscribe(stock => this.stocks = stock);
  }

  getProduct(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(id)
      .subscribe(product => this.product = product);
  }

  goBack(): void {
    this.location.back();
  }

  sendEmail(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    let email = new Email(id,localStorage.getItem('username'));
    debugger
    this.productService.sendEmail(email).subscribe(() => {});
  }

  save(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.updateProduct(this.product, id)
      .subscribe(() => this.goBack());
  }

  delete(product: Product): void {
    this.productService.deleteProduct(product.id).subscribe(() => this.goBack());
    // this.store.dispatch(new ProductListActions.DeleteProduct({product: product , id: product.id}));
    // this.location.back()
  }

  getRoles() {
    this.userService.getUser(localStorage.getItem('username')).subscribe(user => {
      if (user.role.roleName.toLowerCase() === 'admin') {
        this.isAdmin = true;
      }
    });
  }

  modalFunction(): void {
    this.showModal = !this.showModal;
  }


  isProductAvailable(): boolean {
    const id = +this.route.snapshot.paramMap.get('id');
    this.stocks.forEach(stock => {
      if (stock.productID === id && stock.quantity > 0) {
        this.isAvb = true;
      }
    });
    return this.isAvb;
  }

  addToCart() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(localStorage.getItem('username')).subscribe(user => {
      this.cart = user.cart;
      let ok = 0;
      this.cart.find(elem => {
        if (elem.productId === id) {
          elem.quantity++;
          ok = 1;
        }
      });
      if (!ok && this.cart != null) {
        this.cart.push({productId: id, quantity: 1});
      }
      this.userService.postCart(localStorage.getItem('username'), this.cart).subscribe(() => this.location.back());
    });
  }
}
