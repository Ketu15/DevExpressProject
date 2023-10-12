import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { HttpClient } from '@angular/common/http';
import { Order } from 'src/app/models/order.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  gridData:  any;
  products: any[] = [];
  selectedProduct: any = null;

  constructor(private orderService: OrderService, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    debugger
    this.orderService.getItems().subscribe(data => {
    this.gridData = this.orderService.getItems()
    });
  }

  updateOrder(event: any): void {
    debugger;
    if (event.key && this.fetchData) {
      const updatedOrder = event.oldData as Order;
      const newupdatedOrder = event.newData as Order;
      const OrderId = event.key.toString(); 
      console.log('Updating customer with ID:', OrderId);
      console.log('Updated customer data:', updatedOrder);
  
      this.orderService.updateOrder(OrderId, newupdatedOrder)
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

 


  deleteOrder(event: any) {
    const deletedCustomerId = event.data.id;
    this.orderService.deleteOrder(deletedCustomerId).subscribe(() => {
      this.ngOnInit();
    });
  }

}
