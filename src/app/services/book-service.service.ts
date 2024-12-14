import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookModel } from '../models/book-model';
import { environment } from '../../../environment';
import { UserModel } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  constructor(private http:HttpClient) { }

  addBook(book:BookModel){
    const formData = new FormData();
    for (const key in book) {
      if (book.hasOwnProperty(key)) {
        formData.append(key,book[key]);
      }
    }
    return this.http.post(environment.base_url+'/book',formData).subscribe();
  }
  getBooks(){
    return this.http.get(environment.base_url+'/books').subscribe()
  }
  editBook(book:BookModel){
    const formData = new FormData();
    for (const key in book) {
      if (book.hasOwnProperty(key)) {
        formData.append(key,book[key]);
      }
    }
    return this.http.put(environment.base_url+'/book',book).subscribe();
  }
  updateProfile(user:UserModel){
    return this.http.put(environment.base_url+'/profile',user).subscribe()
  }

  getUserData(id:string){
    return this.http.get(`${environment.base_url}/profile/${id}`).subscribe()
  }
  getBookById(id:string){
    return this.http.get(`${environment.base_url}/book/${id}`).subscribe()

  }
}
