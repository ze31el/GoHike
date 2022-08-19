import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService} from 'ngx-toastr';
import { HttpClient, HttpClientModule, HttpResponse } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { Gallery } from '../_gallery';
import { Trail } from '../trail';
import { Review } from '../trail';
import { GalleryService } from '../services/gallery.service';
import { TrailDetailService } from '../services/trail-detail.service';
import { switchMap } from 'rxjs/operators';
import { ThisReceiver } from '@angular/compiler';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  //isClicked = false;
  reviewAll : Review[]=[];
   trailId:any;
    file = null;
    form!: FormGroup;
    gallery!: Gallery;
    imageData: any;
    newTrail = new Trail;
    updatedTrail!:Trail;
    readonly trailUrl = 'http://localhost:3000/api/trail';
    
  constructor(private galleryService: GalleryService, private trailDetailService : TrailDetailService, private http: HttpClient, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
        author: new FormControl(null),
        ratings: new FormControl(null),
        review : new FormControl(null),
        image: new FormControl(null)
    });

    
    // console.log('selected')
  }

  onFileSelect(event: any){
    // console.log(event);
    const file = event.target.files[0];

     this.form.patchValue({image: file});
     const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
     if(file && allowedMimeTypes.includes(file.type)){
        const reader = new FileReader();
        reader.onload = () =>{
            this.imageData = reader.result as string;
        }
        reader.readAsDataURL(file);
     }
  }

  private handleError(error: any) {
    console.log("error");
  }

  onSubmit(){
    
    this.route.params.pipe(switchMap((params: Params) => {
      return this.trailDetailService.getSingleTrail(params['trailId'])
    })) 
      .subscribe((newTrail) => { 
        console.log('Selected trail', newTrail); 
        this.newTrail = newTrail; 

        const reviewData: Review = {
          //_id: galleryData.reviewObj._id,
          author: this.form.value.author,
          review: this.form.value.review,
          ratings: this.form.value.ratings,
          imagePath: this.form.value.image
        };
        //this.newTrail.trail_review.push(reviewData);
        //console.log(this.newTrail);

        // this.newTrail.trail_review.forEach(obj => {
        //     this.reviewAll.push(obj);
        //  });
         
        this.updatedTrail= this.newTrail;
        this.updatedTrail.trail_review.push(reviewData);
        //this.updatedTrail.trail_review= this.reviewAll;
        console.log(this.updatedTrail);
        //this.newTrail = new Trail;
        //console.log(this.newTrail);
        // this.route.params.pipe(switchMap((params: Params) => {
        // return this.http.put(this.trailUrl  + '/' + this.updatedTrail._id , this.updatedTrail).toPromise()
        // .then(response => 
        //     response as Trail).catch(this.handleError)
        // }))
        // .toPromise()
          // .then(response => 
          //   response as Trail).catch(this.handleError)
          // this.route.params.pipe(switchMap((params: Params) => {
          //   return this.galleryService.updateTrail(this.updatedTrail, this.updatedTrail._id);
          // }))
          this.http.put<any>(this.trailUrl + '/' +this.updatedTrail._id  ,this.updatedTrail)
            .subscribe((updatedTrail) => {
              console.log(updatedTrail);
              if (updatedTrail) {
                //this.reviewAll = [];
                this.toastr.success("Review added successfully.");
                //this.isClicked = false;
                // this.router.navigateByUrl('movies/' + this.movieId);
              }
    
            });
        
        //this.form.reset();
        //this.form.value.imagePath =null;
        //this.imageData = null;
        
        //this.toastr.success("review added successfully.");

      }); 

    //this.galleryService.addReview(this.form.value.name , this.form.value.image, this.form.value.ratings ,this.form.value.review);
    
    
          //this.isClicked = false;
  }
  cancel(){
    this.router.navigate(['']);
  }
  
}
