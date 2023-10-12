import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl = 'https://localhost:7107/api/products'; 

  constructor(private http: HttpClient) {}

  getPieChartData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  getItems(): Observable<any[]> {
    return this.http.get<any[]>(('https://localhost:7107/api/products'));
  }

  getProduct(id:string): Observable<Product> {
    return this.http.get<Product>(this.baseUrl +'/api/products/' + id);
  }

  updateProduct(id: string, updatedProductData: Product): Observable<any> {
    debugger
    const url = `https://localhost:7107/api/products/${id}`;
    return this.http.put(url, updatedProductData);
  }

  
deleteProduct(id: number): Observable<any> {
  const url = `https://localhost:7107/api/products/${id}`;
  return this.http.delete(url);
}
}
