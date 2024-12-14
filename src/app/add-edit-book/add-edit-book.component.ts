import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { BookModel } from '../models/book-model';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environment';
import { FormsModule } from '@angular/forms';
import { ResMsg } from '../models/res-msg';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-edit-book',
  standalone: true,
  imports: [HttpClientModule,FormsModule,CommonModule],
  templateUrl: './add-edit-book.component.html',
  styleUrl: './add-edit-book.component.css'
})
export class AddEditBookComponent {
isFileUploaded:boolean=false;
selectedFile: File | null = null;
@ViewChild('fileInput') fileInput: any; // ViewChild to access the file input element
book:BookModel = new BookModel()
constructor(private http:HttpClient,private cookieService: CookieService){
  }


onFileSelected(event: any) {
  this.selectedFile = event.target.files[0] as File;
}

addBook(){
  if(this.selectedFile==null)
    {
      alert("Upload File")
      return

    }
  const formData = new FormData();
    for (const key in this.book) {
      if (this.book.hasOwnProperty(key)) {
        formData.append(key, this.book[key]);
      }
    }
    formData.append('ebook', this.selectedFile?this.selectedFile:'')
this.http.post<ResMsg>(environment.base_url+"/book",formData).subscribe(data=>{
  alert(data.message)
  this.resetForm()
},err=>{
  alert("Error adding book")

})
}
  resetForm() {
    this.book=new BookModel()
    this.fileInput.nativeElement.value = '';  

    this.selectedFile=null
  }

uploadFile(){
  document.getElementById('upload-element')?.click()
}
}
