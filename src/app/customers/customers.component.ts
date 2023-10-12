import { Component, OnInit } from '@angular/core';
import { createStore } from 'devextreme-aspnet-data-nojquery';

import { Router } from '@angular/router';
import { CustomersService } from './customers.service';
import { HttpClient } from '@angular/common/http';
import { CustomerData } from '../models/customers.model';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  // data: any[] = [];
  selectedRow:any[]=[];
  // customers: CustomerData[] = [];
  customersFormData: any = {};
  gridData:  any;
  customers: CustomerData[] = [];
  //selectedCustomer: CustomerData[]=[];
  expanded = true;

  totalCount!: number;


  // CustomerDetails:CustomerData={
  //   id:'',
  //   firstName:'',
  //   lastName:'',
  //   city:'',
  //   country:'',
  //   phone:''
  // }

constructor(private http: HttpClient, private router: Router,private customersService:CustomersService) {}

  // ngOnInit() {
  //   this.customersService.getItems().subscribe(data => {
  //     this.gridData = this.customersService.getItems()
  //     // .pipe(
  //     //   catchError((error) => {
  //     //     console.error('Error:', error);
  //     //     return []; // You can return a default value or an empty array here
  //     //   })
  //     // );
  //   });
  // }


  // ngOnInit(): void {
  //   this.fetchData();
  // }

  // fetchData(): void {
  //   this.http.get<any[]>('https://localhost:7107/api/customers').subscribe(data => {
  //     this.gridData = data;
  //   });
  // }
  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.customersService.getItems().subscribe(data => {
    this.gridData = this.customersService.getItems()
    });
  }

  updateCustomer(event: any): void {
    debugger;
    if (event.key && this.fetchData) {
      const updatedCustomer = event.oldData as CustomerData;
      const newupdatedCustomer = event.newData as CustomerData;
      const customerId = event.key.toString(); 
  
      console.log('Updating customer with ID:', customerId);
      console.log('Updated customer data:', updatedCustomer);
  
      this.customersService.updateCustomer(customerId, newupdatedCustomer)
        .subscribe(
          (response) => {
            console.log('Update successful', response);
            this.fetchData();
          },
          (error) => {
            console.error('Update failed', error);
          }
        );
    } else {
      console.error('Invalid event data:', event);
    }
  }


  prevPage(currentPageIndex: number) {
    if (currentPageIndex > 0) {
      this.gridData.pageIndex = currentPageIndex - 1;
    }
  }

  nextPage(currentPageIndex: number, pageCount: number) {
    if (currentPageIndex < pageCount - 1) {
      this.gridData.pageIndex = currentPageIndex + 1;
    }
  }
  
  // updateProduct(event: any) {
  //   const updatedCustomer = event.newData;
  //   const customerId = event.key;
  
  //   this.customersService.updateProduct(customerId, updatedCustomer)
  //     .subscribe(
  //       (response) => {
  //         console.log('Update successful', response);
  //         // Optionally, you can update the UI or perform other actions on success.
  //       },
  //       (errorResponse) => {
  //         console.error('Update failed', errorResponse);
  
  //         // Handle validation errors, if present
  //       }
  //     );
  // }
  

  // updateProduct(event: any) {
  //   const updatedProduct = event.newData;
  //   // this.http.put('https://localhost:7107/api/customers/{id}',
  //   this.customersService.updateProduct(event.key, updatedProduct)
  //     .subscribe(
  //       (response) => {
  //         console.log('Update successful', response);
  //       },
  //       (error) => {
  //         console.error('Update failed', error);
  //       }
  //     ));
  // }
  

  deleteCustomer(event: any) {
    const deletedCustomerId = event.data.id;
    this.customersService.deleteCustomer(deletedCustomerId).subscribe(() => {
      this.ngOnInit();
    });
  }

}
