import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent {
  customersFormData: any = {}; // Object to store form data

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(): void {
    // Handle form submission here
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
}
