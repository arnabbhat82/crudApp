import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interface/product';

@Injectable()

export class FreeApiService {

    constructor(private httpclient: HttpClient) {}

    getProducts(): Observable<Product[]> {
      return this.httpclient.get('https://ecom-node-heroku.herokuapp.com/api/products') as Observable<Product[]>;
    }

    addProduct(product: Product): Observable<any> {
      return this.httpclient.post('https://ecom-node-heroku.herokuapp.com/api/products', product);
    }

}
