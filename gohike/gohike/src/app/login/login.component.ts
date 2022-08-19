import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserDetailService } from '../services/user-detail.service';
import {switchMap} from 'rxjs';
import {User} from '../user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[UserDetailService]
})

export class LoginComponent implements OnInit {

  public loginForm !: FormGroup
  public users: User[]=[];
  isClicked =  false;
  loginUserData = {email:'',password:''}
  constructor(private formBuilder: FormBuilder,  private userDetailService: UserDetailService,private http: HttpClient, private route: ActivatedRoute, private router: Router, private toastr: ToastrService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      "email":['', [Validators.required, Validators.email]],
      "password":['', Validators.required]
    })
    if(this.authService.loggenIn()){
      this.router.navigate(['/'])
      this.toastr.success("Already Logged In");
    }
    window.scroll(0,0);
  }

 login(loginForm : FormGroup){
 
    this.authService.authUser(this.loginUserData)
    .subscribe(res => {
      console.log(res)
        if(res){
          localStorage.setItem('token',res.token)
          localStorage.setItem('name',res.user.fullname)
          this.toastr.success("Login Successful");
          this.loginForm.reset();
          this.router.navigate(['']);
        }else{
          this.toastr.warning("user not found!");
        }
      }, err =>{
        this.toastr.error(err.error);
      })
  }
  cancel(){
    this.router.navigate(['']);
  }
}



