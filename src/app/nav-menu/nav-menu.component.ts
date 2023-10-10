import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ProductsService } from '../products/products.service';
import { PieChartData } from '../models/PieChartData .model';
import { Product } from '../models/products.model';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  piesData: any[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.productsService.getItems().subscribe(data => {
      // Aggregate unit prices from all products
      const aggregatedData = data.reduce((result, product) => {
        return [...result, { productName: product.productName, unitPrice: product.unitPrice }];
      }, []);

      this.piesData = aggregatedData;
    });
  }
}
