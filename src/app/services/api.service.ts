import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: any;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  public get(url: string, page = 1, limit = 15) {
    return this.http.get<Product[]>(this.baseUrl + url, {
      observe: 'body',
      responseType: 'json',
    });
  }
}
