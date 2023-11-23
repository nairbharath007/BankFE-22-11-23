import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomerServiceService } from 'src/app/service/customer-service.service';

declare var bootstrap: any;

@Component({
  selector: 'app-crud-customer',
  templateUrl: './crud-customer.component.html',
  styleUrls: ['./crud-customer.component.css']
})
export class CrudCustomerComponent {
  dataStore: any;
  fetchSingleData: any = {};

  states = [
    // States
    'Andhra Pradesh',        // 1
    'Arunachal Pradesh',     // 2
    'Assam',                 // 3
    'Bihar',                 // 4
    'Chhattisgarh',          // 5
    'Goa',                   // 6
    'Gujarat',               // 7
    'Haryana',               // 8
    'Himachal Pradesh',      // 9
    'Jharkhand',             // 10
    'Karnataka',             // 11
    'Kerala',                // 12
    'Madhya Pradesh',        // 13
    'Maharashtra',           // 14
    'Manipur',               // 15
    'Meghalaya',             // 16
    'Mizoram',               // 17
    'Nagaland',              // 18
    'Odisha',                // 19
    'Punjab',                // 20
    'Rajasthan',             // 21
    'Sikkim',                // 22
    'Tamil Nadu',            // 23
    'Telangana',             // 24
    'Tripura',               // 25
    'Uttar Pradesh',         // 26
    'Uttarakhand',           // 27
    'West Bengal',           // 28
    
    // Union Territories
    'Andaman and Nicobar Islands',       // 29
    'Chandigarh',                       // 30
    'Dadra and Nagar Haveli and Daman and Diu', // 31
    'Lakshadweep',                      // 32
    'Delhi',                            // 33
    'Puducherry',                       // 34
    'Jammu and Kashmir',                // 35
    'Ladakh'                            // 36
  ];

  

  customerRegisterForm = new FormGroup({
    customerId: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    userId: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    contactDetails: new FormControl('', [Validators.required,Validators.pattern(/^\d{10}$/)]),
  });

  customerDeleteForm = new FormGroup({
    customerId: new FormControl('', [Validators.required]),
    firstName: new FormControl({value: '', disabled: true}, [Validators.required]),
    lastName: new FormControl({value: '', disabled: true}, [Validators.required]),
    email: new FormControl({value: '', disabled: true}, [Validators.required, Validators.email]),
    userId: new FormControl({value: '', disabled: true}, [Validators.required]),
    state: new FormControl({value: '', disabled: true}, [Validators.required]),
    gender: new FormControl({value: '', disabled: true}, [Validators.required]),
    contactDetails: new FormControl({value: '', disabled: true}, [Validators.required]),
  });

  @ViewChild('updateModal') private updateModal!: ElementRef;
  @ViewChild('deleteModal') private deleteModal!: ElementRef;

  constructor(private customerService: CustomerServiceService) {
    this.loadAllCustomers();
  }

  loadAllCustomers() {
    this.customerService.SHowAllCustomer().subscribe({
      next: (data) => {
        this.dataStore = data;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching data:', error);
      }
    });
  }

  loadUpdateForm(item: any) {
    this.fetchSingleData = item;
    this.customerRegisterForm.patchValue(item);
  }

  loadDeleteForm(item: any) {
    this.fetchSingleData = item;
    this.customerDeleteForm.patchValue(item);
  }


  closeUpdateModal() {
    const modal = new bootstrap.Modal(this.updateModal.nativeElement);
    modal.hide();
  }

  closeDeleteModal() {
    const modal = new bootstrap.Modal(this.deleteModal.nativeElement);
    modal.hide();
  }

  submitData(data: any) {
    this.customerService.UpdateCustomer(data).subscribe({
      next: (response) => {
        console.log('Update Successful.', response);
        this.loadAllCustomers();
        this.closeUpdateModal();
        
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error updating customer.', error);
      }
    });
  }

  submitDeleteData(data: any) {
    this.customerService.DeleteCustomer(data.customerId).subscribe({
      next: (response) => {
        console.log('Deletion successful:', response);
        this.loadAllCustomers();
        this.closeDeleteModal();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error deleting customer:', error);
      }
    });
  }



  // Validator accessors for update form
  get firstNameValidator() { return this.customerRegisterForm.get('firstName'); }
  get lastNameValidator() { return this.customerRegisterForm.get('lastName'); }
  get emailValidator() { return this.customerRegisterForm.get('email'); }
  get customerValidator() { return this.customerRegisterForm.get('customerId'); }
  get userValidatorId() { return this.customerRegisterForm.get('userId'); }
  get stateValidator() { return this.customerRegisterForm.get('state'); }
  get genderValidator() { return this.customerRegisterForm.get('gender'); }
  get contactDetailsValidator() { return this.customerRegisterForm.get('contactDetails'); }

  // Validator accessors for delete form
  get DfirstNameValidator() { return this.customerDeleteForm.get('firstName'); }
  get DlastNameValidator() { return this.customerDeleteForm.get('lastName'); }
  get DemailValidator() { return this.customerDeleteForm.get('email'); }
  get DcustomerValidator() { return this.customerDeleteForm.get('customerId'); }
  get DuserValidatorId() { return this.customerDeleteForm.get('userId');
 }
}
