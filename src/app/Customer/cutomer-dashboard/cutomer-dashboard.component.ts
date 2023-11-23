import { NgIfContext } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountServiceService } from 'src/app/service/account-service.service';
import { CustomerServiceService } from 'src/app/service/customer-service.service';
import { DataServiceService } from 'src/app/service/data-service.service';

@Component({ 
  selector: 'app-cutomer-dashboard',
  templateUrl: './cutomer-dashboard.component.html',
  styleUrls: ['./cutomer-dashboard.component.css']
})
export class CutomerDashboardComponent {
  condition=true;
  sharedComponent:any
  rollNo:any;
  userName:any;
  userId:any;
  customerDataStore:any;
  customerId:any;
  newUserId=this.datas.userId
  newAccounId=this.datas.accountId
  newUserName=this.datas.userName

 // newCustomerid=this.datas.customerId not work
  needRegistartion=false//showing registartion needed
  showWarrning=false//create account request
  accountStorage:any//

  constructor(private auth:CustomerServiceService,private routeSet:Router,
   private route:ActivatedRoute,private datas:DataServiceService ,
   private forAccount:AccountServiceService)
  {
    this.userName=datas.userName
    this.userId=datas.userId,
   
    console.log("someValue",this.userId);
      

    auth.UserIdFetchcustomerId(this.userId).subscribe(
      {
        next:(data)=>
        {
          this.customerDataStore=data

          //extracting customerobject and passing data service
          this.customerId=this.customerDataStore.customerId
          console.log("CustomerId",this.customerId);
          
          datas.customerId=this.customerId
          
        },
        error:(err:HttpErrorResponse)=>
        {
          console.log(err);
          console.log("error in customerId not created ");
        }
      }
    )

  } 

  reset(){location.reload()}

  
passbook:any;
showPassbook=false;
//view Pass book
viewPassbook()
{
  
    this.showPassbook=true;

    this.showQuery=false
    this.showDocument = false;
    this.showAccountCreate=false;
    this.showTransaction=false;
    this.showAccountForm=false;
    this.showAccountStatment=false
    this.showQueryTab=false
    this.showCalculator = false;
      this.showCardsState = false;
}

//show Account statment
showAccountStatment=false

viewAccountStatement()
{
 this.showAccountStatment=true

 this.showQuery=false
this.showDocument = false;
this.showAccountCreate=false;
this.showTransaction=false;
this.showAccountForm=false;
this.showPassbook=false;
this.showQueryTab=false
this.showCalculator = false;
      this.showCardsState = false;
}
 


//ask query form
showQuery=false;

viewQueryForm()
{
this.showQuery=true

this.showAccountStatment=false;
this.showDocument = false;
this.showAccountCreate=false;
this.showTransaction=false;
this.showAccountForm=false;
this.showPassbook=false;
this.showQueryTab=false
this.showCalculator = false;
      this.showCardsState = false;
}



//document form
showDocument: boolean = false;

showDocumentFun() {
  this.showDocument = true;

  this.showAccountStatment=false
  this.showQuery=false
 this.showAccountCreate=false;
 this.showTransaction=false;
 this.showAccountForm=false;
 this.showPassbook=false;
 this.showQueryTab=false
 this.showCalculator = false;
      this.showCardsState = false;
}


//account form
showAccountCreate:boolean=false;
showAccountCreateFun()
{

this.showAccountCreate=true;

  this.showDocument = false;
  this.showQuery=false
  this.showTransaction=false;
  this.showAccountForm=false;
  this.showPassbook=false;
  this.showAccountStatment=false
  this.showQueryTab=false
  this.showCalculator = false;
      this.showCardsState = false;
      this.showWarrning=false;


}


//show transaction interface
showTransaction=false
showTransactionFun()
{
  
this.showTransaction=true
  
  

  this.showDocument = false;
  this.showQuery=false
  this.showAccountCreate=false;
  this.showAccountForm=false;
  this.showPassbook=false;
  this.showAccountStatment=false
  this.showQueryTab=false
  this.showCalculator = false;
      this.showCardsState = false;
  
  
}


//Account type requesting from shoeing function
showAccountForm=false;
showAccountRequestFun()
{
 
this.showAccountForm=true;

  
  this.showTransaction=false
  this.showDocument = false;
  this.showQuery=false
  this.showAccountCreate=false;
  this.showPassbook=false;
  this.showWarrning=true
  this.showAccountStatment=false
  this.showQueryTab=false
  this.showCalculator = false;
      this.showCardsState = false;
      this.showWarrning=false;
}


//logout

showQueryTab=false
queyFunShow()
{
 this.showQueryTab=true
 
 this.showTransaction=false
 this.showDocument = false;
 this.showQuery=false
 this.showAccountCreate=false;
 this.showPassbook=false;
 this.showAccountForm=false;
 this.showAccountStatment=false
 this.showCalculator = false;
      this.showCardsState = false;
}
logout() {
  // Call the logout method to clear user-related data
  this.datas.logout();
  this.routeSet.navigateByUrl("")
  // Additional logout logic (e.g., redirect to login page) can be added here
}
showCardsState = true;
showCards() {
  this.showQueryTab = false
  this.showTransaction = false
  this.showAccountCreate = false;
  this.showDocument = false;
  this.showQuery = false
  this.showAccountCreate = false;
  this.showPassbook = false;
  this.showAccountForm = false;
  this.showCalculator = false;
}
showCalculator = false;
fdcalculator() {
  this.showQueryTab = false
  this.showTransaction = false
  this.showAccountCreate = false;
  this.showDocument = false;
  this.showQuery = false
  this.showAccountCreate = false;
  this.showPassbook = false;
  this.showAccountForm = false;
  this.showCalculator = true;
  this.showCardsState = false;
}

 
}



