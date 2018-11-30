import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector: Injector) { }

  intercept(req, next) {
    let authService = this.injector.get(AuthService)
    // cloning request
    let tokenReq = req.clone({
      // add header containing authorization information
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}` // directly injects token as part of the string value
      }
    })
    return next.handle(tokenReq)
  }
}
