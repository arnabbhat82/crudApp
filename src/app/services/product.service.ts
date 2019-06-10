import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productApiEndpoint = 'https://ecom-node-heroku.herokuapp.com/api/products';

  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.httpClient
      .get(this.productApiEndpoint) as Observable<Product[]>;
  }

  getProduct(id: string): Observable<Product> {
    return this.httpClient
      .get(`${this.productApiEndpoint}/${id}`) as Observable<Product>;
  }

  addProduct(newProduct: Product): Observable<Product> {
    interface ProductRaw extends Product {
      __v: number;
    }

    return this.httpClient
      .post(this.productApiEndpoint, newProduct)
      .pipe(map(({__v, details, ...product}: ProductRaw) => product)) as Observable<Product>;
  }

  editProduct(product: Product): Observable<{ message: string }> {
    const { _id, ...productParts } = product;
    return this.httpClient
      .patch(`${this.productApiEndpoint}/${_id}`, productParts) as Observable<{ message: string }>;
  }

  deleteProduct(id: string): Observable<{ message: string }> {
    return this.httpClient
      .delete(`${this.productApiEndpoint}/${id}`) as Observable<{ message: string }>;
  }
}
