import { Injectable } from '@angular/core';
import { LoginModel } from '../models/login-model';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../../environment';
import { UserModel } from '../models/user-model';
import { Observable, map, timer, catchError, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private tokenKey:string = 'token';
  private tokenExpiration:number = 600000;
  private tokenExpirationTimer: any;
  private isAuthenticated:boolean = false;
  constructor(private http:HttpClient, private cookieService: CookieService) { }

  login(login_model:LoginModel):Observable<boolean>{
    return this.http.post(environment.base_url + '/auth/login', login_model).pipe(
      map(data => {
        this.isAuthenticated = true;
        return true;
      }),
      catchError(err => {
        this.isAuthenticated = false;
        return of(false);
      })
    );
  }

    register(user:UserModel): Observable<any>{
      return this.http.post(environment.base_url+"/auth/register",user);
    }
    getToken(): string | null {
      return this.cookieService.get(this.tokenKey);
    }
    refreshToken(): Observable<any> {
      const expiredToken = this.getToken();
      return this.http.post<any>(environment.base_url+'/revokeSession', { token: expiredToken });
    }
  
    clearToken(): void {
      this.cookieService.delete(this.tokenKey);
    }
  
    startTokenExpirationTimer(expiryTime: number): void {
      const refreshTime = expiryTime - this.tokenExpiration;
      this.tokenExpirationTimer = timer(refreshTime).subscribe(() => {
        this.refreshToken().subscribe(
          newToken => {
            this.startTokenExpirationTimer(newToken.expiryTime);
          },
          error => {
            console.error('Error refreshing token:', error);
            this.clearToken();
          }
        );
      });
    }
  
    stopTokenExpirationTimer(): void {
      if (this.tokenExpirationTimer) {
        this.tokenExpirationTimer.unsubscribe();
      }
    }

  
    logout(): void {
      this.isAuthenticated = false;
    }
  
    isLoggedIn(): boolean {
      return this.isAuthenticated;
    }
    setLogIn(status:boolean){
      this.isAuthenticated=status;
    }
}
