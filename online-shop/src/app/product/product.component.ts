import {Component, OnInit} from '@angular/core';
import {AppState, Product} from '../product';
import {ProductService} from '../product.service';
import {UserService} from '../user.service';
import {select, Store} from '@ngrx/store';
import {selectProductList} from '../store/selectors/product.selector';
import {User} from '../User';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[];
  user: User;

  products$;
  isAdmin = false;

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private store: Store<AppState>
  ) {
    this.products$ = this.store.pipe(select(selectProductList));
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  getRoles() {
    this.userService.getUser(localStorage.getItem('username')).subscribe(user => {
      if (user.role.roleName.toLowerCase() === 'admin') {
        this.isAdmin = true;
      }
    });
  }


  ngOnInit() {
    // this.store.dispatch(new GetProducts());
    this.getProducts();
    this.getRoles();
  }

}
