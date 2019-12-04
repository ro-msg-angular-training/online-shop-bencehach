import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

import {ProductService} from '../product.service';
import {Product} from '../product';
import {AuthenticationService} from '../authentication.service';
import {UserService} from '../user.service';
import {Cart} from '../OrderInput';
import {element} from 'protractor';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product;
  showModal = false;
  isAdmin = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location,
    private authenticationService: AuthenticationService,
    private router: Router,
    private userService: UserService,
  ) {
  }

  roles: string[] = [];
  cart: Cart[] = [];

  ngOnInit(): void {
    this.getProduct();
    this.getRoles();
  }

  getProduct(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(id)
      .subscribe(product => this.product = product);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.updateProduct(this.product, id)
      .subscribe(() => this.goBack());
  }

  delete(product: Product): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.deleteProduct(product, id).subscribe(() => this.goBack());
  }

  getRoles()
  {
    this.userService.getUser(localStorage.getItem('username')).subscribe(
      user =>
      {
        this.roles=user.roles;

        this.roles.find(elem =>
        {
          if(elem === 'admin')
            this.isAdmin=true;
        })
      }
    )
  }

  modalFunction(): void {
    this.showModal = !this.showModal;
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
