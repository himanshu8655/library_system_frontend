import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from '../models/user-model';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environment';
import { ResMsg } from '../models/res-msg';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,HttpClientModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username:string=''
  password:string = ''
  validated:boolean = false;
  user:UserModel = new UserModel()
  
  constructor(private router: Router,private http:HttpClient) { }

  register(){
    this.validated=this.checkValidation(this.user);
    if(!this.validated) {
      return
    }
   this.http.post<ResMsg>(environment.base_url+'/auth/register',this.user).subscribe((data)=>{
    if(data.message==="Registered Successfully"){
      alert(data.message)
      this.router.navigate([environment.LOGIN_PG])
    }

  },(err)=>alert("Registeration failed"))
  }
  checkValidation(user: UserModel):boolean {
    if(user.email_id=='' || user.password=='' || user.phn_no=='' || user.name==''){
      alert ("Missing Details")
      return false;
    }
    return true;
  }
}
