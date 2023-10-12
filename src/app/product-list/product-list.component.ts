import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/products.model';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = []; 
  
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
  
  public createImgPath = (serverPath: string) => { 
    return `https://localhost:7107/${serverPath}`; 
  }
}