import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { matchpassword } from 'src/app/matchpassword.validator';
import { CustomerServiceService } from 'src/app/service/customer-service.service';
import { DataServiceService } from 'src/app/service/data-service.service';

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.css'] 
})
export class CustomerRegisterComponent {

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



  customerRegisterForm=new FormGroup(
    {
      firstName:new FormControl('',[Validators.required]),
      lastName:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required,Validators.email]),
      userId:new FormControl(''),
      DOB:new FormControl('',[Validators.required]),
      gender: new FormControl('', [Validators.required]),
      contactDetails: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
      state: new FormControl('', [Validators.required]),
    },
  

  )
  
  get firstNameValidator()
  {
    return this.customerRegisterForm.get('firstName')
  }
  get lastNameValidator()
  {
    return this.customerRegisterForm.get('lastName')
  }
  get dobValidator()
  {
    return this.customerRegisterForm.get('DOB')
  }
  get emailValidator()
  {
    return this.customerRegisterForm.get('email') 
  }
 
  // get userValidator()
  // {
  //   return this.customerRegisterForm.get('userId')
  // }

  get genderValidator() {
    return this.customerRegisterForm.get('gender');
  }

  get contactValidator() {
    return this.customerRegisterForm.get('contactDetails');
  }

  get stateValidator() {
    return this.customerRegisterForm.get('state');
  }

userId:any
  constructor(private auth:CustomerServiceService,private router:Router,
    private datas:DataServiceService)
    {
      this.userId=datas.userId
      
    }
   

  responceRegisteration=false;

  submitData(data:any)
  {
    console.log(data);
    
this.auth.RegisterCustomer(data).subscribe(
  {
    next:(data)=>
    {
    
      console.log(data);
      alert("registration success");
      location.reload();
      
    },
    error:(err:HttpErrorResponse)=>
    {
      if(err)
      {
        this.responceRegisteration=true;
        this.router.navigateByUrl("/customer")
      }
      console.log(err);
      console.log("error here");
      
      
    }
  }
)
  }

  reset()
  {
    location.reload();
  }


}
