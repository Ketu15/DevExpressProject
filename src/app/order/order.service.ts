import { Injectable } from '@angular/core';
import { Product } from '../models/products.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})

    export class OrderService {
      private apiUrl = 'https://localhost:7107/api/orders';
      baseApiUrl : String = environment.baseApiUrl;
      constructor(private http: HttpClient) { }

      GetOrder(id: number): Observable<any> {
        const url = `https://localhost:7107/api/orders/${id}`;
        return this.http.get(url);
      }

      GetBook(id: string):Observable<Product>{
        return this.http.get<Product>(this.baseApiUrl + '/api/products/' +id);
      }

      getProducts(): Observable<any> {
        return this.http.get(`${this.apiUrl}/products`);
      }

      getItems(): Observable<any[]> {
        return this.http.get<any[]>(('https://localhost:7107/api/orders'));
      }
    

    
      updateOrder(id: string, updatedOrdertData: Order): Observable<any> {
        debugger
        const url = `https://localhost:7107/api/orders/${id}`;
        return this.http.put(url, updatedOrdertData);
      }
    
      
    deleteOrder(id: number): Observable<any> {
      const url = `https://localhost:7107/api/orders/${id}`;
      return this.http.delete(url);
    }

    }
