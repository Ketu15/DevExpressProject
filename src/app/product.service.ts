import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './models/products.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getPieChartData() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'https://localhost:7107/api/products'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
  
}