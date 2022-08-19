import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ReviewDetailService } from '../services/review-detail.service';
import { TrailDetailService } from '../services/trail-detail.service';
import { SavedTrail, Trail,Activity } from '../trail';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService} from 'ngx-toastr';
import { switchMap } from 'rxjs/operators'; 
import { SavedTrailsService } from '../services/saved-trails.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-trails',
  templateUrl: './trails.component.html',
  styleUrls: ['./trails.component.css'],
  providers:[ReviewDetailService,TrailDetailService]
})
export class TrailsComponent implements OnInit {

  public reviews: Trail[] = [];
  public trails: Trail[]=[];
  newTrail!: Trail;
  savedTrail!: SavedTrail;
  pageContent = { 
    header: { 
      title: '', body: '' 
    } 
  }; 
  trail : any;
  savedFlag = false;
  trailData !: SavedTrail;
  saveTrailId!: string;
  savedTrailArr!: SavedTrail[];
  activity!: Activity[];
  newSavedDisplayTrail!: Trail[]; 
  selectedTrailName !: String;
  displayTrail !: SavedTrail;
  trailsList !: Trail[];
  fetchedTrails : any[]=[];
  trailType !: Trail; 
  

  constructor(private reviewDetailService: ReviewDetailService, private trailDetailService : TrailDetailService, private route: ActivatedRoute, private toastr: ToastrService, private http:HttpClient,private router: Router, private savedTrailsService: SavedTrailsService, public authService : AuthService) { }

  
  ngOnInit(): void {
    if(this.route.snapshot.params['paramValue']){
      // this.trailDetailService.getSeletedTrails(this.route.snapshot.params['paramValue'])
      // .subscribe(trails => {
      //   this.trails = trails as Trail[];
      //   },
      // err => {
      //   if(err instanceof HttpErrorResponse){
      //     if(err.status ===401){
      //         this.router.navigate(['/login'])
      //     }else{
      //       this.toastr.error(err.error.message)
      //     }
      //   }else{
      //     this.toastr.error(err.error.message)
      //   }
      // }); 
       //fetch single trail data

       this.route.params.pipe(switchMap((params: Params) => { 
        return this.trailDetailService.getSingleTrail(params['paramValue']); 
      })) 
        .subscribe((newTrail: Trail) => { 
          if(!newTrail){
            console.log('newTrail is undefined'); 
            //get single saved data after click on saved trail list
            this.route.params.pipe(switchMap((params: Params) => { 
              if(params['paramValue']){
                this.selectedTrailName=params['paramValue']
              }
              return this.savedTrailsService.getSingleSavedTrailById(params['paramValue']); 
            })) 
              .subscribe((trailData) => { 
                console.log('Saved trail Selected', trailData); 
                this.newSavedDisplayTrail = JSON.parse(JSON.stringify(trailData)); 
                
                //for each condition to fetch single saved record
                for (let trail of this.newSavedDisplayTrail) {
                  if (trail.name === this.selectedTrailName) {
                      this.newTrail = trail;
                  }
                }
                if(!this.newTrail){
                  this.trailDetailService.getTrails().subscribe((response) =>{
                    this.trailsList= response;
                    for (let trail of JSON.parse(JSON.stringify(this.trailsList))) {
                      if (trail.name === this.selectedTrailName) {
                        this.trailType = JSON.parse(JSON.stringify(trail as Trail))
                        this.fetchedTrails.push(this.trailType as Trail)
                        this.newTrail = trail;
                      }else if(trail.location.toLowerCase().includes(this.selectedTrailName.toLowerCase())){
                        this.trailType = JSON.parse(JSON.stringify(trail as Trail))
                        this.fetchedTrails.push(this.trailType as Trail)
                        this.newTrail = trail
                      }
                      //else if(trail.activities){
                        else{
                        this.activity = JSON.parse(JSON.stringify(trail.activities));
                        //if(this.activity.includes(this.selectedTrailName))
                        for(let activity of this.activity){
                          if(activity.activity1 === this.selectedTrailName){
                            this.newTrail = trail
                            this.trailType = JSON.parse(JSON.stringify(trail as Trail))
                            this.fetchedTrails.push(this.trailType)
                          }else if(activity.activity8 === this.selectedTrailName){
                            this.newTrail = trail
                            this.trailType = JSON.parse(JSON.stringify(trail as Trail))
                            this.fetchedTrails.push(this.trailType)
                          }else if(activity.activity2 === this.selectedTrailName){
                            this.newTrail = trail
                            this.trailType = JSON.parse(JSON.stringify(trail as Trail))
                            this.fetchedTrails.push(this.trailType)
                          }else if(activity.activity3 === this.selectedTrailName){
                            this.newTrail = trail
                            this.trailType = JSON.parse(JSON.stringify(trail as Trail))
                            this.fetchedTrails.push(this.trailType)
                          }else if(activity.activity4 === this.selectedTrailName){
                            this.newTrail = trail
                            this.trailType = JSON.parse(JSON.stringify(trail as Trail))
                           this.fetchedTrails.push(this.trailType)
                          }else if(activity.activity5 === this.selectedTrailName){
                            this.newTrail = trail
                            this.trailType = JSON.parse(JSON.stringify(trail as Trail))
                          this.fetchedTrails.push(this.trailType)
                          }else if(activity.activity6 === this.selectedTrailName){
                            this.newTrail = trail
                            this.trailType = JSON.parse(JSON.stringify(trail as Trail))
                            this.fetchedTrails.push(this.trailType)
                          }else if(activity.activity7 === this.selectedTrailName){
                            this.newTrail = trail
                            this.trailType = JSON.parse(JSON.stringify(trail as Trail))
                            this.fetchedTrails.push(this.trailType)
                          }
                        }
                        
                      }
                    }
                      for(let savedTrail of this.newSavedDisplayTrail){
                        if(this.newTrail.name === savedTrail.name){
                          this.saveTrailId=savedTrail._id;
                          this.savedFlag = true;
                        }
                      }
                        //this.newTrail = this.newSavedDisplayTrail[0]; 
                        this.activity = JSON.parse(JSON.stringify(this.newTrail.activities));                       
                        this.activity = JSON.parse(JSON.stringify(this.activity));
                        this.pageContent.header.title = this.newTrail.name; 
                        this.pageContent.header.body = 'Details for selected Trail.';   
                        this.savedTrailArr = JSON.parse(JSON.stringify(this.newSavedDisplayTrail))
                        
                        // for(let trail of this.fetchedTrails){
                        //   console.log("Fetch Trail Details" + this.trailType)
                        //   console.log("Trail name"+ + this.trailType.name)
                        //   console.log("Trail location"+ + this.trailType.location)
                        //   console.log("Trail starRatings"+ + this.trailType.starRatings)
                        //   console.log("Trail description"+ + this.trailType.description)
                        //   console.log("Trail fee"+ + this.trailType.fee)
                        //   console.log("Trail description"+ + this.trailType.trail_length)
                        // }
                    
                  }) 
                }
                //this.newTrail = this.newSavedDisplayTrail[0]; 
                this.activity = JSON.parse(JSON.stringify(this.newTrail.activities));
                
                this.activity = JSON.parse(JSON.stringify(this.activity));
                this.pageContent.header.title = this.newTrail.name; 
                this.pageContent.header.body = 'Details for selected Trail.';   
                this.savedTrailArr = JSON.parse(JSON.stringify(this.newSavedDisplayTrail))
                this.saveTrailId=this.newTrail._id;
                if(this.authService.loggenIn() && (this.newTrail.name === this.selectedTrailName)){ 
                  console.log("User Logged In, Trails can be saved in wishlist")
                  // if(this.savedTrailArr && (this.savedTrailArr[0].name === this.newTrail.name)){
                  this.savedFlag =true  
                // }
                }else{
                  this.savedFlag = false;
                }
              },
                err => {
                  console.log(err.error.message)
                } 
              ); 
          }
        });

    }else{
      this.trailDetailService.getTrails()
      .subscribe(trails => {
        this.fetchedTrails = trails as Trail[];
        },
      err => {
        if(err instanceof HttpErrorResponse){
          if(err.status ===401){
              this.router.navigate(['/login'])
          }else{
            this.toastr.error(err.error.message)
          }
        }else{
          this.toastr.error(err.error.message)
        }
     }); 
    }
    
    // this.trailDetailService
 
    // this.reviewDetailService
    //   .getReviews()
    //   .then(reviews =>{
    //     this.reviews = reviews as Trail[];
    //   });
      
    window.scroll(0,0);
  }

}
