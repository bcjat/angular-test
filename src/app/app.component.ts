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
  sortBy: string = 'Sort By';
  currentPage = 1;
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

  /**
   * Sorting data based on selected attributes.
   */
  sortProducts() {
    let queryString = '';
    if (this.sortBy != 'Sort By') {
      queryString = '/products?_page=1&_limit=50&_sort=' + this.sortBy;
    } else {
      queryString = '/products?_page=1&_limit=50';
    }

    this.apiService.get(queryString).subscribe((data: Product[]) => {
      this.products = data;
      console.log(this.products);
    });
  }
}
