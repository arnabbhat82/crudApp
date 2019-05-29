import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { Product } from './interfaces/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  products: Product[];
  message: string;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts()
      .subscribe(data => this.products = data);
  }

  addProduct() {
    const newProduct: Product = {
      name: 'Chocolate',
      price: 50,
      details: '',
      quantityAvailable: 20
    };
    this.productService.addProduct(newProduct)
      .subscribe(console.log);
  }

  editProduct(i: number) {
    this.productService.editProduct(this.products[i])
      .subscribe(data => {
        this.products[i].price += 10;
        this.message = data.message;
      });
  }

  deleteProduct(i: number) {
    this.productService.deleteProduct(this.products[i])
      .subscribe(data => {
        this.products.splice(i, 1);
        this.message = data.message;
      });
  }
}
