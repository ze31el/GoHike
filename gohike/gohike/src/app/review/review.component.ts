import { Component, Inject, Injector, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService} from 'ngx-toastr';
import {switchMap} from 'rxjs';
import {ReviewDetailService} from '../services/review-detail.service';
import { Trail } from '../trail';
import { GalleryService } from '../services/gallery.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  isClicked = false;
  public reviewForm !: FormGroup;
  // form!: FormGroup;
  //   gallery!: Gallery;
  //   imageData: any;
  public newReview = {
    //author: '',
    ratings: 5,
    review: ''
    };
  constructor(private formBuilder : FormBuilder, private reviewDetailService: ReviewDetailService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService, private galleryService: GalleryService) { 
    this.reviewForm = this.formBuilder.group({
       //"author": '',
      "ratings": 5,
      "review": ''
    })
  }

  ngOnInit(): void {
    
  }

  review(){
    console.log(this.reviewForm?.controls);
    this.isClicked = true;

    if (this.reviewForm.valid) {
      let formcontrol = this.reviewForm.controls;

      let review: any = {
        // "author": formcontrol['author'].value,
        "ratings": formcontrol['ratings'].value,
        "review": formcontrol['review'].value
        
      }
    this.route.params.pipe(switchMap((param: Params) => this.reviewDetailService.createReview(review)))
      .subscribe((review: any) => {
        console.log(review);
        if (review && review._id) {

          this.reviewForm.reset();
          this.toastr.success("review added successfully.");
          this.isClicked = false;
          //this.router.navigateByUrl('');
        }

      });
    }

    
  }

  // imageAdd(){
  //   this.galleryService.addGallery(this.form.value.name, this.form.value.image);
  //     this.form.reset();
  //     this.imageData = null;
  // }

  

}
