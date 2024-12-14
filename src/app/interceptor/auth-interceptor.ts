import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse,HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(private cookieService: CookieService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.cookieService.get('token').trim();
    const modifiedRequest = request.clone({
      setHeaders: token?{
        Authorization: token
      }:{},
      
      });
  
      return next.handle(modifiedRequest).pipe(
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse && (event.url?.endsWith('login') || event.url?.endsWith('revokeSession'))) {
            let token = event.body.token
            if(token)
            this.cookieService.set('token',`Bearer ${token}`)
            
          }
        }, (error: any) => {
          if (error instanceof HttpErrorResponse) {
            console.error('Error intercepted:', error);
          }
        })
      );
    }
  }