import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { environment } from '../../../environment';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-app-header',
  standalone: true,
  imports: [RouterLink, RouterModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.css'
})
export class AppHeaderComponent {

constructor(private router:Router, private cookieService:CookieService){}

profilePage() {
this.router.navigate([environment.PROFILE_PG])
}
logout(){
  this.cookieService.deleteAll()
  this.router.navigate([environment.LOGIN_PG])
  }
}
