import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly loginUrl = 'http://localhost:3000/apiUser/user/login'
  constructor(private http: HttpClient,private router: Router,
    private toastr: ToastrService) { }

  authUser(user: any){
    return this.http.post<any>(this.loginUrl,user);
  }

  loggenIn(){
    return !!localStorage.getItem('token')
  }

  getToken(){
    return localStorage.getItem('token')

  }
  logoutUser(){
    this.toastr.success("Logout Successful");
    localStorage.removeItem('token') 
    localStorage.removeItem('name') 
    this.router.navigate(['/'])
    setTimeout(function(){ window.location.reload()},700)
  }
}
