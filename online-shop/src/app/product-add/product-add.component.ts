import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {ProductService} from '../product.service';
import {Product} from '../product';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  products: Product[];
  product: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location,
    private store: Store<{ productList: { products: Product[] } }>
  ) {
  }

  ngOnInit(): void {

    this.getProduct();

  }

  getProduct(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(id)
      .subscribe(product => this.product = product);
  }

  goBack(): void {
    this.location.back();
  }

  add(productName: string, categoryName: string, image: string, price: number, description: string): void {
    if (!productName) {
      return;
    }
    this.productService.addProduct({productName, categoryName, image, price, description} as Product)
      .subscribe(() => this.goBack());
  }

}
