import {Component, NgModule, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../product';
import {ProductService} from '../product.service';
import {RouterModule} from '@angular/router';
import {AuthGuard} from '../auth.guard';
import {AuthGuardService} from '../guards/auth-guard.service';
import {AuthenticationService} from '../authentication.service';
import {UserService} from '../user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  products: Product[];
  isAdmin= false;
  roles: string[];

  constructor(private productService: ProductService, private authenticationService:AuthenticationService, private userService: UserService) {
  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe(products => this.products = products);
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

  ngOnInit() {
    this.getProducts();
    this.getRoles();
  }

  ngOnDestroy(): void {
     // this.authenticationService.logout();
  }

}
