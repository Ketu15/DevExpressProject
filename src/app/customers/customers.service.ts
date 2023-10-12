import { Injectable } from '@angular/core';
import { CustomerData } from '../models/customers.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
 baseApiUrl : String = environment.baseApiUrl;

 private apiUrl = 'https://localhost:7107/api/customers';

//private baseApiUrl = 'https://localhost:7107/api/customers ';

  constructor(private http: HttpClient) {}

  getItems(): Observable<any[]> {
    return this.http.get<any[]>(('https://localhost:7107/api/customers'));
  }
  
    getCustomers(id:string): Observable<CustomerData> {
      return this.http.get<CustomerData>(this.apiUrl +'/api/customers/' + id);
    }
  

    updateCustomer(id: number, updatedCustomerData: CustomerData): Observable<any> {
      debugger
      const url = `https://localhost:7107/api/customers/${id}`;
      return this.http.put(url, updatedCustomerData);

    }



    
  deleteCustomer(id: number): Observable<any> {
    const url = `https://localhost:7107/api/customers/${id}`;
    return this.http.delete(url);
  }

}