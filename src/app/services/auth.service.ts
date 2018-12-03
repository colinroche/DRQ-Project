import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "http://localhost:8081/api/register"
  private _loginUrl = "http://localhost:8081/api/login";

  constructor(private http: HttpClient,
              private _router: Router) { }

  registerUser(user) {
   return this.http.post<any>(this._registerUrl, user)
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user)
   }

   loggedIn() {
     // returns true if token value is present in Local Storage meaning there is a user logged in
     return !!localStorage.getItem('token')
   }

   logoutUser() {
     localStorage.removeItem('token')
     this._router.navigate(['/information'])
   }

   getToken() {
     return localStorage.getItem('token')
   }
}
