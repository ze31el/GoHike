import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReviewDetailService } from '../services/review-detail.service';
import { TrailDetailService } from '../services/trail-detail.service';
import { Activity, SavedTrail, Trail } from '../trail';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastrService} from 'ngx-toastr';
import { switchMap } from 'rxjs/operators'; 
import { SavedTrailsService } from '../services/saved-trails.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers:[ReviewDetailService]
})
export class DetailComponent implements OnInit {

  public reviews: Trail[] = [];
  readonly trailUrl = 'http://localhost:3000/apiSavedTrail/savedTrails';

  constructor(private reviewDetailService: ReviewDetailService, private trailDetailService : TrailDetailService, private route: ActivatedRoute, private toastr: ToastrService, private http:HttpClient, private savedTrailsService: SavedTrailsService,
    public authService : AuthService,private router: Router) { }

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
  ngOnInit() : void {
    this.reviewDetailService
      .getReviews()
      .then(reviews =>{
        this.reviews = reviews as Trail[];
      });
      
      
      //fetch single trail data
      this.route.params.pipe(switchMap((params: Params) => { 
        return this.trailDetailService.getSingleTrail(params['trailId']); 
      })) 
        .subscribe((newTrail: Trail) => { 
          if(!newTrail){
            console.log('newTrail is undefined'); 
            //get single saved data after click on saved trail list
            this.route.params.pipe(switchMap((params: Params) => { 
              if(params['trailId']){
                this.selectedTrailName=params['trailId']
              }
              return this.savedTrailsService.getSingleSavedTrailById(params['trailId']); 
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
          }else{
          console.log('Selected trail', newTrail); 
          this.newTrail = newTrail; 
          this.activity = JSON.parse(JSON.stringify(this.newTrail.activities));
          this.pageContent.header.title = newTrail.name; 
          this.pageContent.header.body = 'Details for selected Trail.'; 

          //get single saved data
          this.route.params.pipe(switchMap((params: Params) => { 
            return this.savedTrailsService.getSingleSavedTrail(this.newTrail.name); 
          })) 
            .subscribe((trailData) => { 
              console.log('Saved trail Selected', trailData); 
              this.trailData = trailData;
              this.savedTrailArr = JSON.parse(JSON.stringify(this.trailData))
              
              for(let trail of this.savedTrailArr){
                if(trail.name === this.newTrail.name){
                  this.displayTrail = trail;
                }
              }
               
              this.saveTrailId=this.displayTrail._id;
              //this.newTrail = newTrail; 
              if(this.savedTrailArr && (this.displayTrail.name === this.newTrail.name)){
                this.savedFlag =true
                if(this.authService.loggenIn()){ 
                  console.log("User Logged In, Trails can be saved in wishlist")
                }else{
                  this.savedFlag = false;
                }
              }


            }); 
          }  
        });
        window.scroll(0,0);
    }

    onSaveAndDelete(){
    this.savedTrail = this.newTrail; 
      if(this.savedFlag){
        this.route.params.pipe(switchMap((param: Params) => this.savedTrailsService.deleteSavedTrail(this.saveTrailId)))
        .subscribe((savedTrail) => {
          console.log(savedTrail);
          if (savedTrail && savedTrail._id) {
            this.toastr.success("Trail unsaved.")
            this.savedFlag =false;
          }
        });
      }else if(!this.authService.loggenIn() && !this.savedFlag){
          this.toastr.warning("Please login to proceed");
          this.router.navigate(['/login'])
      }
      else{
        //save data in savetrail table
        this.route.params.pipe(switchMap((param: Params) => this.savedTrailsService.createSaveTrail(this.savedTrail)))
        .subscribe((savedTrail) => {
          console.log(savedTrail);
          if (savedTrail && savedTrail._id) {
            this.toastr.success("Trail saved successfully.")
            this.savedFlag =true;
            this.trailData = savedTrail
            this.saveTrailId=this.trailData._id;
          }
        });
      }
  
    }

  }
