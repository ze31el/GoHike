import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Trail } from '../trail';

@Injectable({
  providedIn: 'root'
})
export class ReviewDetailService {

  private reviewUrl = 'http://localhost:3000/apiReview/review';

  constructor(private http:HttpClient){}

  getReviews(): Promise<void | Trail[]> {
    return this.http.get(this.reviewUrl)
      .toPromise()
      .then(response => response as Trail[])
      .catch(this.handleError);
  }



  private handleError(error: any) {
    console.log("error");
}

createReview(newReview: Trail): Promise<void | Trail> {
    return this.http.post(this.reviewUrl, newReview).toPromise()
      .then(response => response as Trail).catch(this.handleError);
      
  }
}
