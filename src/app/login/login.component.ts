import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginModel } from '../models/login-model';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environment';
import { ResMsg } from '../models/res-msg';
import { CookieService } from 'ngx-cookie-service';
import { UserModel } from '../models/user-model';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
 
})
export class LoginComponent implements OnInit{
login_model:LoginModel = new LoginModel()
constructor(private router: Router,private http:HttpClient,private authService:AuthenticationService,private cookieService: CookieService) { 
  this.login_model.email_id='test@gmail.com'
  this.login_model.password = '123456'
}
  ngOnInit(): void {
    const token = this.cookieService.get('token')
   if (token) {
    this.authService.setLogIn(true)
    this.router.navigate([environment.HOME_PG])
  }
  }

login(){
  this.http.post(environment.base_url + '/auth/login', this.login_model).subscribe(data=>{

    this.authService.setLogIn(true)
    this.router.navigate([environment.HOME_PG]) 
  },err=>{
    if(err instanceof HttpErrorResponse && err.status == 401) 
      alert("Invalid Email ID/Password")
    else
      alert("Error Processing Request!")

  }
)

}
}
