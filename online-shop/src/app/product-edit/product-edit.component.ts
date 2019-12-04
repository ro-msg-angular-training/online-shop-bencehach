import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {ProductService} from '../product.service';
import {Product} from '../product';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  id;
  productForm: FormGroup = new FormGroup({
    name: new FormControl('',
      [
        Validators.required,
        Validators.minLength(4),
      ]),
    category: new FormControl('',
      [
        Validators.required,
        Validators.minLength(2),
      ]),
    image: new FormControl('',
      [
        Validators.required,
        Validators.minLength(10),
      ]),
    price: new FormControl('',
      [
        Validators.required,
        Validators.pattern(/^\d+$/),
      ]),
    description: new FormControl('',
      [
        Validators.required,
        Validators.minLength(15),
      ]),
  });

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location
  ) {
  }

  ngOnInit(): void {

    if (this.route.snapshot.url.toString().includes('edit')) {
      const pricePattern = /^\d+$/;

      this.id = +this.route.snapshot.paramMap.get('id');
      this.productService.getProduct(this.id).subscribe(data => {

          this.productForm = new FormGroup({
            name: new FormControl(data.name,
              [
                Validators.required,
                Validators.minLength(4),
              ]),
            category: new FormControl(data.category,
              [
                Validators.required,
                Validators.minLength(2),
              ]
            ),
            image: new FormControl(data.image,
              [
                Validators.required,
                Validators.minLength(10),
              ]
            ),
            price: new FormControl(data.price,
              [
                Validators.required,
                Validators.pattern(pricePattern),
              ]
            ),
            description: new FormControl(data.description,
              [
                Validators.required,
                Validators.minLength(10),
              ]
            ),
          });
        }
      );
    }
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {

    if (this.route.snapshot.url.toString().includes('edit')) {

      this.productService.updateProduct(this.productForm.value, this.id)
        .subscribe(() => this.goBack());
    } else if (this.route.snapshot.url.toString().includes('add')) {
      this.productService.addProduct(this.productForm.value).subscribe(() => this.goBack());
    }
  }

  public findInvalidControls(name: string) {
    if (this.productForm.get(name).invalid) {
      return true;
    }
  }
}
