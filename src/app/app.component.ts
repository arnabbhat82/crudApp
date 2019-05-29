import { Component, OnInit } from '@angular/core';
import { FreeApiService } from './services/freeapi.service';
import { Product } from './interface/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'API';
  lstProducts: Product[];

  constructor(private freeApiService: FreeApiService) {}

  ngOnInit() {
    this.freeApiService.getProducts().subscribe(data => {
      this.lstProducts = data;
    });

    const newProduct: Product = {
      name: 'Chocolate',
      price: 50,
      details: '',
      quantityAvailable: 20
    };

    this.freeApiService.addProduct(newProduct).subscribe(console.log);
  }
}
