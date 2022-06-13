import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Product } from '../interfaces/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: any;
  public static wait$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

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
