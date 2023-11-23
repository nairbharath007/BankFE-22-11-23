import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataServiceService } from 'src/app/service/data-service.service';
import { QueryServiceService } from 'src/app/service/query-service.service';

@Component({
  selector: 'app-view-query',
  templateUrl: './view-query.component.html',
  styleUrls: ['./view-query.component.css']
})
export class ViewQueryComponent {
  customerId:any

  constructor(private auth:QueryServiceService, 
    private datas:DataServiceService){
      this.customerId=  datas.customerId
    }
  queries:any
  queryNotFound=false


  customerIdForm = new FormGroup({
    customerId: new FormControl('', [Validators.required])
  });

  get qValidator()
  {
    return this.customerIdForm.get('customerId')
  }

tableShow=false
  showQuery(data:any)
  {
    this.auth.getCustomerQuery(data.customerId).subscribe(
      {
        next:(data)=>
        {
          console.log(data);
          
          this.tableShow=true
         this.queries=data
       
        },
        error:(err:HttpErrorResponse)=>
        {
          console.log(err);
         this.queryNotFound=true
          
        }
      }
    )
  }


  refreshfun()
  {
    location.reload();
  }
}
