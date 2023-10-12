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
  types: string[] = ['splinearea', 'stackedsplinearea', 'fullstackedsplinearea'];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.productsService.getItems().subscribe(data => {

      const aggregatedData = data.reduce((result, product) => {
        return [...result, { productName: product.productName, unitPrice: product.unitPrice, quantity: product.quantity }];
      }, []);

      this.piesData = aggregatedData;
    });
  }
}
