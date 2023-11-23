import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Modal } from 'bootstrap';
import { AccountServiceService } from 'src/app/service/account-service.service';
import { DocumentServiceService } from 'src/app/service/document-service.service';

@Component({
  selector: 'app-admin-account-request',
  templateUrl: './admin-account-request.component.html',
  styleUrls: ['./admin-account-request.component.css']
})
export class AdminAccountRequestComponent {

  @ViewChild('documentModal') private modalElement!: ElementRef;
  private modal!: Modal;


  refreshfun() {
    console.log('refreshfun called');
    location.reload();
  }
  accounts: any[] = [];
  showAccountNotFound = false
  accountRequestTrue = false
  constructor(private auth: AccountServiceService, private doc: DocumentServiceService, private sanitizer: DomSanitizer) {
    this.auth.ShowAccountRequest().subscribe(
      {
        next: (data: any) => {
          this.accounts = data;
          this.accountRequestTrue = true
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error fetching accounts:', error);
          this.showAccountNotFound = true
          this.accountRequestTrue = false
        }
      }
    );
  }

  ngAfterViewInit() {
    this.modal = new Modal(this.modalElement.nativeElement);
  }


  acceptAccount(account: any) {
    this.auth.ActivateAccountById(account).subscribe(
      {
        next: (res) => {
          alert("account Activated Successfully")
          location.reload()
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);


        }
      }
    )
  }
  viewDocument(account: any) {

  }
  // Assuming 'documents' is an array of bytes representing the image
  searchForm: FormGroup = new FormGroup({
    documentId: new FormControl(''),
  });
  documents: any;
  imageSource: any
  documentDetails: any
  showCustomerNotUploaded: any

 

  onSubmit(data: any) {

    this.doc.GetuploadDocument(data.documentId).subscribe(
      {
        next: (responce: ArrayBuffer) => {

          const base64Image = this.arrayBufferToBase64(responce);
          this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpeg;base64, ${base64Image}`);
          this.modal.show();

        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.showCustomerNotUploaded = true

        }
      }
    )


  }

  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  searchCustomerId: any


  close() {
    this.imageSource = null
    if (this.modal) {
      this.modal.hide();
  }

}
}
