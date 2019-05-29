import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product';

@Injectable()
export class ProductService {
  private productApiEndpoint = 'https://ecom-node-heroku.herokuapp.com/api/products';

  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.httpClient.get(this.productApiEndpoint) as Observable<Product[]>;
  }

  getProduct(product: Product): Observable<Product[]> {
    return this.httpClient.get(`${this.productApiEndpoint}/${product._id}`) as Observable<Product[]>;
  }

  addProduct(product: Product): Observable<Product> {
    return this.httpClient.post(this.productApiEndpoint, product) as Observable<Product>;
  }

  editProduct(product: Product): Observable<{ message: string }> {
    return this.httpClient.patch(`${this.productApiEndpoint}/${product._id}`, product) as Observable<{ message: string }>;
  }

  deleteProduct(product: Product): Observable<{ message: string }> {
    return this.httpClient.delete(`${this.productApiEndpoint}/${product._id}`) as Observable<{ message: string }>;
  }
}
