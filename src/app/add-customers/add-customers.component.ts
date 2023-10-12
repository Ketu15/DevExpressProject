import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-customers',
  templateUrl: './add-customers.component.html',
  styleUrls: ['./add-customers.component.css']
})
export class AddCustomersComponent {

  customersFormData: any = {}; 

  constructor(private http: HttpClient, private router: Router) {}



  onSubmit(): void {
   
    this.http.post('https://localhost:7107/api/customers', this.customersFormData).subscribe(
      (response) => {
        console.log('Product added successfully', response);
        this.router.navigate(['customers']);
      },
      (error) => {
        console.error('Error adding product', error);
      }
    );
  }

 // customersForm!: FormGroup;

 // constructor(private fb: FormBuilder, private http: HttpClient) {}

  // ngOnInit(): void {
  //   this.customersForm = this.fb.group({
  //     firstName: ['', Validators.required],
  //     lastName: ['', Validators.required],
  //     city: ['', Validators.required],
  //     country: ['', Validators.required],
  //     phone: [0, Validators.min(0)],
  //   });
  // }

  // onSubmit(): void {
  //   if (this.customersForm.valid) {
  //     const customersData = this.customersForm.value;

  //     this.http.put('https://localhost:7107/api/customers', customersData).subscribe(
  //       (response) => {
  //         console.log('Customers added successfully', response);
  //         // Optionally, you can reset the form here.
  //       },
  //       (error) => {
  //         console.error('Error adding Customers', error);
  //       }
  //     );
  //   }
  // }

  goBack(): void {
    this.router.navigate(['/customers']); 
  }
}
