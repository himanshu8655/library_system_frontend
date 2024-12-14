import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { BookTileComponent } from '../book-tile/book-tile.component';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environment';
import { CommonModule } from '@angular/common';
import { BookPaginationDTO } from '../models/book-pagination-dto';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { BookGridComponent } from '../book-grid/book-grid.component';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BookTileComponent, BookGridComponent,HttpClientModule,CommonModule,RouterOutlet, MatPaginatorModule, MatFormFieldModule, MatSelectModule, MatTableModule,MatSlideToggleModule,MatIconModule, MatRadioModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
onFilterChange($event: any) {
  this.getBooks()
}
currentPageIndex:number = 0
pageSize:number = 5
sortDirection:string = 'asc'
filter_by = 'bookId';
view = 'gridView'

onPageChange($event: PageEvent) {
  this.currentPageIndex=$event.pageIndex
  this.pageSize = $event.pageSize
  this.getBooks()
}
  
  books_data:BookPaginationDTO=new BookPaginationDTO()
  constructor(private http:HttpClient,private cookieService: CookieService,private router:Router){
    }
    ngOnInit(): void {

      this.getBooks();

    }
  checkOut(){
    
    this.router.navigate([environment.CHECKOUT_PG]);
  }
  addBook(){
    this.router.navigate([environment.ADD_EDIT_BOOK_PG])
  }
  logout(){
    this.cookieService.deleteAll()
    this.router.navigate([environment.LOGIN_PG])
    }
    profile(){
      this.router.navigate([environment.PROFILE_PG])
    }
    getBooks() {
      this.http.get<BookPaginationDTO>(environment.base_url+`/book?page=${this.currentPageIndex}&size=${this.pageSize}&sortBy=${this.filter_by}&sortDirection=${this.sortDirection}`).subscribe(data=>{
        this.books_data=data
      })
    }
}
