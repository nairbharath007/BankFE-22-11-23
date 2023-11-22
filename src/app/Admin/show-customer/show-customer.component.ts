import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerServiceService } from 'src/app/service/customer-service.service';
import { DataServiceService } from 'src/app/service/data-service.service';

@Component({
  selector: 'app-show-customer',
  templateUrl: './show-customer.component.html',
  styleUrls: ['./show-customer.component.css']
})
export class ShowCustomerComponent {


  CustomerStorage:any
  constructor(private auth:CustomerServiceService,private datas:DataServiceService)
  {
              auth.SHowAllCustomer().subscribe(
                {
                  next:(res)=>
                  {
                    //here returing list
                    this.CustomerStorage=res
                   // datas.accountId=this.CustomerStorage.accountNumber
                  },
                  error:(err:HttpErrorResponse)=>
                  {
                    console.log(err);
                    console.log("account id not created");
                  }
                }
              )
            
  
  }



  CustomerForm = new FormGroup({
    customerId: new FormControl('',[ Validators.required]),
    
  });
  
  get customerIdValidator()
  {
  return this.CustomerForm.get('customerId')
  }


  customerData:any
  customerDataTrue=false
  onSubmit(data:any)
  {
    console.log("id",data);
    
    this.auth.getOneCustomer(data.customerId).subscribe(
      {
        next:(res)=>
        { this.customerDataTrue=true
          console.log(res);
          this.customerData=res;
         
          
        },
        error:(err:HttpErrorResponse)=>
        {
          console.log(err);
          
        }
      }
    )
  }





}
