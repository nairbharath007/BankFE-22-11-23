import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerServiceService } from 'src/app/service/customer-service.service';

@Component({
  selector: 'app-crud-customer',
  templateUrl: './crud-customer.component.html',
  styleUrls: ['./crud-customer.component.css']
})
export class CrudCustomerComponent {
  fetchSingleData: any={};

  constructor(private auth:CustomerServiceService)
  {
    auth.SHowAllCustomer().subscribe(
    {
     next:(data)=>
     {
      this.dataStore=data 
     } ,
     error:(er:HttpErrorResponse)=>
     {
      console.log(er);
      
     }
    })

  }
  
  dataStore:any

 
 store:any

  selectedData(eventIdPass:any)
  {
    console.log(eventIdPass.target.value);
    this.auth.getCustomerById(eventIdPass.target.value).subscribe(
      {
        
        
        next:(data)=>
        {

          console.log("success");
          console.log(data);
          
          this.fetchSingleData=data
        },
        error:(err:HttpErrorResponse)=>
        {
          console.log("error here");
          console.log(err);
          
        }
      }
    )
  }


  customerRegisterForm=new FormGroup(
    {
      customerId:new FormControl('',[Validators.required]),
      firstName:new FormControl('',[Validators.required]),
      lastName:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required,Validators.email]),
      userId:new FormControl('',[Validators.required]),
      state:new FormControl('',[Validators.required]),
      gender:new FormControl('',[Validators.required]),
      contactDetails:new FormControl('',[Validators.required]),
      
     
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

  get emailValidator()
  {
    return this.customerRegisterForm.get('email')
  }
 
  get customerValidator()
  {
    return this.customerRegisterForm.get('customerId')
  }
  get userValidatorId()
  {
    return this.customerRegisterForm.get('userId')
  }

  get stateValidator()
  {
    return this.customerRegisterForm.get('state')
  }

    
    get genderValidator()
  {
    return this.customerRegisterForm.get('gender')

  }
  get contactDetailsValidator()
  {
    return this.customerRegisterForm.get('contactDetails')

  }


  submitData(data:any)
  {
    this.auth.UpdateCustomer(data).subscribe(
      { 
        next:(data)=>
      {
         alert("successfully updated")
         console.log(data);
         location.reload()
         
        },
        error:(err:HttpErrorResponse)=>
      {
        console.log(err);
  
      }
      }
    )
  }

  UpdateCustomer=false
  DeleteCustomer=false
  showDeleteForm()
  {
    this.DeleteCustomer=true
    this.UpdateCustomer=false
  }

  showUpdateForm()
  {
    this.DeleteCustomer=false
    this.UpdateCustomer=true
  }


  //Delete Form 
  customerDeleteForm=new FormGroup(
    {
      customerId:new FormControl('',[Validators.required]),
      firstName:new FormControl('',[Validators.required]),
      lastName:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required,Validators.email]),
      userId:new FormControl('',[Validators.required])
     
    },
  

  )
  
  get DfirstNameValidator()
  {
    return this.customerDeleteForm.get('firstName')
  }
  get DlastNameValidator()
  {
    return this.customerDeleteForm.get('lastName')
  }

  get DemailValidator()
  {
    return this.customerDeleteForm.get('email')
  }
 
  get DcustomerValidator()
  {
    return this.customerDeleteForm.get('customerId')
  }
  get DuserValidatorId()
  {
    return this.customerDeleteForm.get('userId')
  }


  submitDeleteData(data:any)
  {
    this.auth.DeleteCustomer(data.customerId).subscribe(
      {
        next:(data)=>
        {
          console.log(data);
          alert("Successfully Deleted")
          location.reload()
        },
        error:(err:HttpErrorResponse)=>
        {
          console.log(err);

          
        }
      }
    )
  }




}
