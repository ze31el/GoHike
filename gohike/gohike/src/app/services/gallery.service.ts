import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { Trail } from '../trail';
import { Review } from '../trail';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  private review: Review[] = [];
  private getreview: Trail[] = [];
  private review$ = new Subject<Trail[]>()
  //readonly galleryUrl = 'http://localhost:3000/apiGallery/gallery';
  readonly trailUrl = 'http://localhost:3000/api/trail';
  constructor(private http: HttpClient) { }

  // getReview(){
  //   this.http
  //   .get<{getreview: Trail[]}>(this.trailUrl)
  //   .pipe(
  //     map((galleryData: any) => {
  //       return galleryData.getreview;
  //     })
  //   ).subscribe((getreview) => {
  //       this.getreview = getreview;
  //       this.review$.next(this.getreview);
  //   })
   
  // }

  // getGalleryStream(){
  //   return this.review$.asObservable();
  // }

  addReview(author: string, image: File, review: string, ratings: string) : void{
    const galleryData = new FormData();
    galleryData.append("author", author);
    galleryData.append("image", image, author);
    galleryData.append("review", review);
    galleryData.append("ratings", ratings);
    this.http.post<{reviewObj: Review}>(this.trailUrl, galleryData)
    .subscribe((galleryData) => {
      const reviewData: Review = {
        //_id: galleryData.reviewObj._id,
        author: author,
        review: review,
        ratings: ratings,
        imagePath: galleryData.reviewObj.imagePath
      };
      this.review.push(reviewData);
      this.review$.next(this.getreview);
    })
    
  }

 updateTrail(newTrail: Trail, trailId: string): Promise<void | Trail> {
    console.log('tester');
    //const createdGallery = await newTrail.save();
    return this.http.put(this.trailUrl + '/' + trailId, JSON.stringify(newTrail)).toPromise()
      .then(response => response as Trail).catch(this.handleError);
  }

  private handleError(error: any) {
    console.log("error");
  }
}
