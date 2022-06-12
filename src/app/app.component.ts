import { Component, OnInit } from '@angular/core';
import { Product } from './interfaces/product';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'products-grid';
  products: Product[];
  constructor(private apiService: ApiService) {
    this.products = [];
  }
  ngOnInit(): void {
    this.apiService
      .get('/products?_page=1&_limit=50')
      .subscribe((data: Product[]) => {
        this.products = data;
        console.log(this.products);
      });
  }
}
