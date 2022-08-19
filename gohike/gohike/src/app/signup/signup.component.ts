import { HttpClient } from '@angular/common/http';
import { Component, Inject, Injector, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService} from 'ngx-toastr';
import {switchMap} from 'rxjs';
import {UserDetailService} from '../services/user-detail.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  public signupForm !: FormGroup;
  userId = '';
  //IsCreate = true;
  isClicked = false;
  user: any;

  constructor( private formBuilder : FormBuilder, private userDetailService: UserDetailService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) { 
    this.signupForm = this.formBuilder.group({
      "fullname":['', Validators.required],
      "email":['', [Validators.required, Validators.email]],
      "password":['', Validators.required],
      "mobile":['', [Validators.required, Validators.pattern(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/)]]
    })
  }

  ngOnInit(): void {
    window.scroll(0,0);

  }

  signUp() {
    console.log(this.signupForm?.controls);
    this.isClicked = true;
    if (this.signupForm.valid) {
      let formcontrol = this.signupForm.controls;

      let user: any = {
        "fullname": formcontrol['fullname'].value,
        "email": formcontrol['email'].value,
        "password": formcontrol['password'].value,
        "mobile": formcontrol['mobile'].value
      }

      
        this.route.params.pipe(switchMap((param: Params) => this.userDetailService.createUser(user)))
          .subscribe((user: any) => {
            console.log(user);
            if (user && user._id) {
              this.toastr.success("User added successfully.")
              this.isClicked = false;
              this.router.navigateByUrl('login');
            }

          });
    }
  }

  cancel(){
    this.router.navigate(['']);
  }
}
