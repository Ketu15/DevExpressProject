import { Component, OnInit } from '@angular/core';
import { OrderService } from './order.service';
import { Product } from '../models/products.model';
import { Order } from '../models/order.model';

import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NumberFormatStyle } from '@angular/common';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent {
  orderdata:Order = {
    Id:0,
    product_Id: '',
    cus_Id: '',
    orderDate: new Date(),
    unitPrice: '',
    quantity: 1,
    // Other order properties
  };
  productdata:Product = {
    id:0,
    productName: '',
    unitPrice: 0,
  package: '',
  quantity:0 ,
  isDiscontinued: true,
  };


  constructor(private orderService : OrderService, private router : Router,private route: ActivatedRoute,private http: HttpClient) { }
  ngOnInit(): void {
    debugger
    this.route.paramMap.subscribe({
    next:(params) => {
      const id = params.get('id');
      
      if(id) {
        this.orderService.GetBook(id)
        .subscribe({
          next:(response) => {
            this.productdata = response;
            var testt = this.productdata.unitPrice;


       
            localStorage.removeItem('productId')
            localStorage.removeItem('unitprice')
            localStorage.setItem('unitprice', testt.toString());
            localStorage.setItem('productId', id);
            
            
          }
        })

      }

    }
    })
  }
  
  getProductDetails() {
    debugger
    this.http.get<any>(`https://localhost:7107/api/products/${this.orderdata.product_Id}`).subscribe(
   
      (data) => {
        this.productdata = data;
      },
      (error) => {
        console.error(error);
      }
    );  
  }

  placeOrder() {
    debugger
    var b=localStorage.getItem("productId");
    var a=localStorage.getItem("unitprice");
    this.orderdata.unitPrice = a as string;
    this.orderdata.product_Id=b as string;
    // Send the order data to the backend to create an order.
    this.http.post<any>('https://localhost:7107/api/orders', this.orderdata).subscribe(
      (data) => {
        this.router.navigate(['products']);
        // Handle the response and any additional actions.
      },
      
      (error) => {
        console.error(error);
      }
    );
  }

  cancelOrder() {
    this.router.navigate(['products']);
    // Add any logic you want to perform when the order is canceled
    console.log('Order canceled.');
  }
}