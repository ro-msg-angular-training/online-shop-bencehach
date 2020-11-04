import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../product';
import {ProductService} from '../product.service';
import {Cart, DeliveryLocations, OrderInput} from '../OrderInput';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
@Injectable()
export class ShoppingCartComponent implements OnInit, OnDestroy {

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private location: Location,
    private router: Router,
  ) {
  }

  showModal = false;
  product: Product;
  listOfProducts: Product[] = [];
  delivery: DeliveryLocations = {
    addressCountry: 'Romania',
    addressCity: 'Arad',
    addressStreet: 'Cal'
  };
  cart: Cart[] = [];
  showList = true;

  orderInput: OrderInput = {
    userId: localStorage.getItem('username'),
    productsList: this.cart,
    deliveryLocation: this.delivery
  };

  emptyCart() {
    if (this.listOfProducts.length === 0) {
      this.showList = false;
    }
  }

  add() {
    this.orderInput.productsList = this.cart;
    this.orderInput.deliveryLocation = this.delivery;
    this.userService.postOrder(this.orderInput).subscribe(() => {
    });
    this.userService.postCart(localStorage.getItem('username'), this.cart).subscribe();
    this.userService.deleteCartAfterCheckout(localStorage.getItem('username')).subscribe();
    this.modalFunction();
  }

  backToProductsList() {
    this.listOfProducts = [];
    this.cart = [];
    this.router.navigate(['/products']).then();
  }

  getUserCart(username: string) {
    this.userService.getUser(username).subscribe(user => {
        this.cart = user.cart;
        this.cart.forEach(prod => this.productService.getProduct(prod.productId).subscribe(a => {
          this.listOfProducts.push(a);
          this.showList = true;
        }));
      }
    );
  }

  getQuantity(id: number): number {
    let quantity = null;
    this.cart.find(element => {
      if (element.productId === id) {
        quantity = element.quantity;
      }
    });
    return quantity;
  }

  increaseQuantity(id: number) {
    let quantity = this.getQuantity(id);
    this.cart.find(element => {
      if (element.productId === id) {
        element.quantity = quantity + 1;
      }
    });
    this.userService.postCart(localStorage.getItem('username'), this.cart).subscribe();
  }

  decreaseQuantity(id: number) {
    let quantity = this.getQuantity(id);
    this.cart.find(element => {
      if (element.productId === id && quantity > 1) {
        element.quantity = quantity - 1;
      }
    });
    this.userService.postCart(localStorage.getItem('username'), this.cart).subscribe();
  }

  deleteFromCart(id: number) {
    this.listOfProducts.find(a => {
      if (a !== undefined && a.id === id) {
        this.listOfProducts.splice(this.listOfProducts.indexOf(a), 1);
      }
    });
    this.cart.find(element => {
      if (element !== undefined && element.productId === id) {
        this.cart.splice(this.cart.indexOf(element), 1);
      }
    });
    this.emptyCart();
    debugger
    this.userService.deleteFromCart(id, localStorage.getItem('username')).subscribe(() => {
    });
  }

  productsCost() {
    let sum = 0;
    this.listOfProducts.forEach(cart => sum += cart.price * this.getQuantity(cart.id));
    return sum;
  }

  ngOnInit() {
    this.getUserCart(localStorage.getItem('username'));
    this.emptyCart();
  }

  ngOnDestroy() {
    this.userService.postCart(localStorage.getItem('username'), this.cart).subscribe();
  }

  modalFunction() {
    this.showModal = !this.showModal;
  }
}


