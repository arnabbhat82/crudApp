import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

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

    // return this.httpClient
    //   .post(this.productApiEndpoint, newProduct)
    //   .pipe(map(({__v, details, ...product}: ProductRaw) => product)) as Observable<Product>;


    // This is what happens inside the map function
    function trimProduct(productRaw: ProductRaw) {
      // This is the destructuring ({__v, details, ...product})
      const product = {
        _id: productRaw._id,
        name: productRaw.name,
        price: productRaw.price,
        quantityAvailable: productRaw.quantityAvailable
      };
      // This is the return part ( => product )
      return product;
    }

    return this.httpClient
      .post(this.productApiEndpoint, newProduct)
      .pipe(
        tap(objOriginal => console.log('Original object returned by backend -', objOriginal)),
        map(trimProduct),
        tap(objModified => console.log('Modified object by map operation -', objModified))
      ) as Observable<Product>;
  }

  editProduct(modifiedProduct: Product): Observable<{ message: string }> {
    const { _id, ...productRest } = modifiedProduct;
    return this.httpClient
      .patch(`${this.productApiEndpoint}/${_id}`, productRest) as Observable<{ message: string }>;
  }

  deleteProduct(id: string): Observable<{ message: string }> {
    return this.httpClient
      .delete(`${this.productApiEndpoint}/${id}`) as Observable<{ message: string }>;
  }
}
