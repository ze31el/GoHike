import {Component} from "@angular/core";
import { ReviewComponent } from "./review/review.component";

export class Activity{
    activity1:string = '';
    activity2:string = '';
    activity3:string = '';
    activity4:string = '';
    activity5:string = '';
    activity6:string = '';
    activity7:string = '';
    activity8:string = '';
}

// export class Review{
//     // author: string ='';
//     ratings: string = '';
//     review : string ='';
// }

export interface Review{
    // _id: string;
    author: string;
    ratings: string;
    review: string;
    imagePath: string;
}

export class Trail{
    _id: string = '';
    name: string = '';
    location: string = '';
    description:string= '';
    activities!: Activity;
    fee: string = '';
    starRatings: string = '';
    trail_length: string = '';
    trail_review !: Review[];
    imagePath!: string;

}


export class SavedTrail{
    _id: string = '';
    name: string = '';
    location: string = '';
    description:string= '';
    activities!: Activity;
    fee: string = '';
    starRatings: string = '';
    trail_length: string = '';
    trail_review !: Review[];
    imagePath!: string;
}

