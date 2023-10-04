import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent {
  customersFormData: any = {
    productName: '',
    unitPrice: null, // or provide a default value
    quantity: 0,
    isDiscontinued: false
  };

  response = {
    dbPath: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(): void {
    debugger
    this.http.post('https://localhost:7107/api/products', this.customersFormData).subscribe(
      (response) => {
        console.log('Product added successfully', response);
        this.router.navigate(['products']);
        // Optionally, you can reset the form here.
      },
      (error) => {
        console.error('Error adding product', error);
      }
    );
  }

  uploadFinished(event: any) {
    this.customersFormData.url = event.dbPath; // Assuming the image URL is in the dbPath property
  }
  
}
