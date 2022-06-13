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
  nextPage = 2; // used for pagination holds next page to be fetched
  endOfCatalogue: boolean = false;
  nextProductBatch: Product[];

  wait = ApiService.wait$; //variable cloned for using in html template

  constructor(private apiService: ApiService) {
    this.products = [];
    this.nextProductBatch = [];
  }

  ngOnInit(): void {
    this.wait.next(true);
    this.apiService
      .get('/products?_page=1&_limit=30')
      .subscribe((data: Product[]) => {
        ApiService.wait$.next(false);
        this.products = data;
        this.loadMoreProducts();
      });
  }

  /**
   * Sorting data based on selected attributes.
   */
  sortProducts() {
    let queryString = '';
    if (this.sortBy != 'Sort By') {
      queryString =
        '/products?_page=1&_limit=' +
        this.products.length +
        '&_sort=' +
        this.sortBy;
    } else {
      queryString = '/products?_page=1&_limit=' + this.products.length;
    }

    this.apiService.get(queryString).subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  /**
   * loads more items on scroll reach.
   */
  loadMoreProducts() {
    this.products.push(...this.nextProductBatch);
    this.wait.next(true);
    this.apiService
      .get('/products?_page=' + this.nextPage + '&_limit=30')
      .subscribe((data: Product[]) => {
        ApiService.wait$.next(false);
        this.nextProductBatch = data;
        console.log(data);
        if (data.length < 30) {
          this.endOfCatalogue = true;
        }
        this.nextPage += 1;
      });
  }
}
