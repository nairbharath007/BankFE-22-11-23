// pagination.component.ts

import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { CustomerServiceService } from 'src/app/service/customer-service.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  paginator: any = {};
  dataSource: any;
  currentPage: number = 1;
  pageSize: number = 5; // set your desired initial page size
  totalPages: any;
  headers: any;

  constructor(private auth: CustomerServiceService) {
    this.showBankData(this.currentPage, this.pageSize);
  }

  showBankData(pageNumber: number, pageSize: number) {
    console.log("working");
    this.auth.paginationBank(pageNumber, pageSize).subscribe(
      {
        next: (response) => {
          this.headers = response.headers.get('x-Pagination');
          this.dataSource = response.body;
          this.headers = JSON.parse(this.headers);
          this.totalPages = this.headers.TotalPage;
          this.paginator.pageIndex = this.currentPage - 1;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      }
    );
  }

  pageChanged(page: number) {
    this.currentPage = page;
    this.showBankData(this.currentPage, this.pageSize);
  }

  getPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
