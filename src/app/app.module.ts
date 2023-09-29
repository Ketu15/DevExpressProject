import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { DxCheckBoxModule, DxFormModule,DxDataGridModule, DxDrawerModule, DxListModule, DxMenuModule, DxButtonModule, DxPivotGridModule, DxSelectBoxModule } from 'devextreme-angular';
import { AddCustomersComponent } from './add-customers/add-customers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DxTreeListModule } from 'devextreme-angular';
import { NavbarComponent } from './navbar/navbar.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ProductsComponent } from './products/products.component';
import { AddProductsComponent } from './products/add-products/add-products.component';
import { OrderComponent } from './order/order.component';
 import { ProductListComponent } from './product-list/product-list.component';
import { OrderListComponent } from './order/order-list/order-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    AddCustomersComponent,
    NavbarComponent,
    NavMenuComponent,
    ProductsComponent,
    AddProductsComponent,
    OrderComponent,
     ProductListComponent,
     OrderListComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    AppRoutingModule,
    DxTreeListModule,
    DxSelectBoxModule,
    HttpClientModule,
    DxDataGridModule,
    DxPivotGridModule,
    DxListModule,
    DxFormModule,
    DxDrawerModule,
    DxMenuModule,
    DxButtonModule,
    DxCheckBoxModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'customers', component: CustomersComponent },
    ]),
    BrowserAnimationsModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
