import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { CheckoutPgComponent } from './checkout-pg/checkout-pg.component';
import { AddEditBookComponent } from './add-edit-book/add-edit-book.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService } from './services/auth-guard.service';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
    { path: 'check-out', component: CheckoutPgComponent, canActivate: [AuthGuardService]},
    { path: 'book', component: AddEditBookComponent, canActivate: [AuthGuardService]},
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
    
    // { path: 'home', component: HomeComponent},
    // { path: 'check-out', component: CheckoutPgComponent},
    // { path: 'book', component: AddEditBookComponent},
    // { path: 'profile', component: ProfileComponent},
];
