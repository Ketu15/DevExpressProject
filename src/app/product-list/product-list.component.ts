import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/products.model';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    products: any[] = []; // Your list of products

  
  constructor(private productService: ProductService) {}


  ngOnInit(): void{
    debugger
    this.productService.getProducts()
    .subscribe({
      next:(products) => {
        this.products = products;
      },
      error:(response) => {
        console.log(response);
      }
    })
  }
  



//   addToOrder(product: Product): void {
//     // Implementation of the addToOrder method
  
//     // Assuming you have an order object to store products in
//     const orderItem: OrderItem = {
//       productId: product.id,
//       unitPrice: product.unitPrice,
//       quantity: 1,
//       id: 0
//     };
  
//     // If the order object doesn't exist, create it
//     if (!this.order) {
//       this.order = {
//         customerId: 1, // Replace with the actual customer ID
//         totalAmount: 0,
//         orderItems: [],
//       };
//     }
  
//     // Add the order item to the order
//     this.order.orderItems.push(orderItem);
  
//     // Calculate the total amount
//     this.order.totalAmount += orderItem.unitPrice;
  
//     // Optionally, you can update the UI or perform other actions here
//   }
  
}