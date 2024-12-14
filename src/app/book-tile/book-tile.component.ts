import { Component, Input } from '@angular/core';
import { BookModel } from '../models/book-model';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { CommonModule } from '@angular/common';
import { environment } from '../../../environment';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import {MatCheckboxChange, MatCheckboxModule} from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-book-tile',
  standalone: true,
  imports: [FormsModule, CommonModule, MatTableModule, MatCheckboxModule, MatButtonModule, HttpClientModule, MatIcon],
  templateUrl: './book-tile.component.html',
  styleUrl: './book-tile.component.css'
})
export class BookTileComponent {

@Input() books:BookModel[] = []
displayedColumns: string[] = ['multi-select','position' , 'name', 'author', 'description','price'];
selectedCount:number = 0;
selectAllCheckBox: boolean = false;
len:number = 0;

constructor(private router:Router, private http:HttpClient){
}

checkOut(id: string) {
  this.router.navigate([environment.CHECKOUT_PG], { queryParams: { bookid: id } });
}

onSelectBtnPress() {
  this.selectAllCheckBox = !this.selectAllCheckBox
  if(this.selectedCount < this.books.length)
    {
      this.books.forEach(book => book.selected = true);
      this.selectedCount = this.books.length
    }
    else{
      this.books.forEach(book => book.selected = false);
      this.selectedCount = 0
    }
    
  }
  
  onCheckBoxChange($event: MatCheckboxChange) {
    if($event.checked) this.selectedCount ++
    else this.selectedCount --
    if(this.selectedCount!=this.books.length)
      this.selectAllCheckBox = false
    else if (this.selectedCount==this.books.length)
      this.selectAllCheckBox = true
  }
  
  deleteBatch() {
    if(this.selectedCount == 0)
      {
        return
      }
    const selectedBookIds = this.books
        .filter(book => book.selected)
        .map(book => `${book.bookId}`).join(',');
    this.http.delete(`${environment.base_url}/book/${selectedBookIds}`).subscribe(data=>{
      alert("Books Deleted Successfully")
      this.selectedCount = 0
    },err=>{alert("Error Deleting Books")})
  }
}
