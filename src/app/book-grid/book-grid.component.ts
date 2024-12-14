import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookModel } from '../models/book-model';
import { Router } from '@angular/router';
import { environment } from '../../../environment';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-book-grid',
  standalone: true,
  imports: [FormsModule, CommonModule, MatTableModule],
  templateUrl: './book-grid.component.html',
  styleUrl: './book-grid.component.css'
})
export class BookGridComponent {
  @Input() book: BookModel | null = null;
  isExpanded: boolean = false;


constructor(private router:Router){
}

isHovered = false;


onMouseOver() {
  this.isHovered = true;
}

onMouseOut() {
  this.isHovered = false;
}

checkOut(id: string) {
  this.router.navigate([environment.CHECKOUT_PG], { queryParams: { bookid: id } });
}

toggleReadMore() {
  this.isExpanded = !this.isExpanded;
}
}
