import { Component, OnInit } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import { ProductsService } from './products.service';
import { Product } from '../models/products.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  gridData:  any;
  products: any[] = [];
  selectedProduct: any = null;

  constructor(private productsService: ProductsService, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.productsService.getItems().subscribe(data => {
    this.gridData = this.productsService.getItems()
    });
  }

  onSelectionChanged(selectedItems: any): void {
    this.selectedProduct = selectedItems.selectedRowsData[0];
  }

 
  updateProduct(event: any): void {
    debugger;
    if (event.key && this.fetchData) {
      const updatedCustomer = event.oldData as Product;
      const newupdatedCustomer = event.newData as Product;
      const customerId = event.key.toString(); // Ensure event.key is converted to a string if it's a number
  
      console.log('Updating customer with ID:', customerId);
      console.log('Updated customer data:', updatedCustomer);
  
      this.productsService.updateProduct(customerId, newupdatedCustomer)
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

  AddToOrder(event: any): void {
    debugger;
    if (event.key && this.fetchData) {
      // const updatedCustomer = event.oldData as Product;
      // const newupdatedCustomer = event.newData as Product;
      const customerId = event.key.toString(); // Ensure event.key is converted to a string if it's a number
  
      console.log('Updating customer with ID:', customerId);
      //console.log('Updated customer data:', updatedCustomer);
  
      this.productsService.getProduct(customerId)
        .subscribe(
          (response) => {
            console.log('Update successful', response);
            // Optionally, update the displayed data to reflect the changes
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



  deleteProduct(event: any) {
    const deletedCustomerId = event.data.id;
    this.productsService.deleteProduct(deletedCustomerId).subscribe(() => {
      this.ngOnInit();
    });
  }


}
