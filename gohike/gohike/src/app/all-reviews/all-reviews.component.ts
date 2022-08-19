import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { GalleryService } from '../services/gallery.service';
import { Trail } from '../trail';
import { Review } from '../trail';

@Component({
  selector: 'app-all-reviews',
  templateUrl: './all-reviews.component.html',
  styleUrls: ['./all-reviews.component.css']
})
export class AllReviewsComponent implements OnInit, OnDestroy {
  reviewList: Review[] = [];
    //private gallerySubscription!: Subscription;

    constructor(private galleryService: GalleryService) { }

  ngOnInit(): void {
    
    //  this.galleryService.getReview();
    // this.gallerySubscription = this.galleryService.getGalleryStream().subscribe((reviewList: Review[]) =>{
    //     this.reviewList = reviewList;
    //     console.log(reviewList);
    // })


  }
  
  ngOnDestroy(): void {
      //this.gallerySubscription?.unsubscribe();
  }
}
