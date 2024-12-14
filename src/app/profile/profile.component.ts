import { Component, OnInit } from '@angular/core';
import { UserModel } from '../models/user-model';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environment';
import { ResMsg } from '../models/res-msg';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule,HttpClientModule,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  constructor(private http:HttpClient,private cookieService:CookieService,private router:Router){

  }
  user:UserModel=new UserModel()
ngOnInit(): void {
  this.user.UID = this.cookieService.get('uid');
  
  this.http.get<UserModel>(environment.base_url+'/profile/'+this.user.UID).subscribe(data=>{
    this.user=data
    this.user.password='************'
  })
}

updateProfile(){
  this.http.put<ResMsg>(environment.base_url+'/profile',this.user).subscribe(data=>{
      alert(data.message)
      this.router.navigate([environment.HOME_PG])
  })
}
}
