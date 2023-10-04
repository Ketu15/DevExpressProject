import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { AddCustomersComponent } from './add-customers/add-customers.component';
import { ProductsComponent } from './products/products.component';
import { AddProductsComponent } from './products/add-products/add-products.component';
import { OrderComponent } from './order/order.component';
 import { ProductListComponent } from './product-list/product-list.component';
import { OrderListComponent } from './order/order-list/order-list.component';




const routes: Routes = [
  {
    path:'customers',
    component:CustomersComponent
  },
  { path: 'add-customers', component: AddCustomersComponent },
  {
    path:'products',
    component:ProductsComponent
  },
  { path: 'add-products', component: AddProductsComponent },
  { path: 'order', component: OrderComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'order/:id', component: OrderComponent },
  { path: 'order-list', component: OrderListComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
