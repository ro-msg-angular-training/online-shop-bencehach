import { Component, OnInit } from '@angular/core';
import {Product} from '../product';
import {PRODUCTS} from '../mock-products'
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products=PRODUCTS;

  selectedProduct: Product;
  
  onSelect(product: Product): void
  {
    this.selectedProduct = product;
  }


  constructor() { }

  ngOnInit() {
  }

}
