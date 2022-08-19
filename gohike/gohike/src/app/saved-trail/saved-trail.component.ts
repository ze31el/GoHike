import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { SavedTrailsService } from '../services/saved-trails.service';
import { TrailDetailService } from '../services/trail-detail.service';
import { Trail } from '../trail';

@Component({
  selector: 'app-saved-trail',
  templateUrl: './saved-trail.component.html',
  styleUrls: ['./saved-trail.component.css']
})
export class SavedTrailComponent implements OnInit {
  public trails: Trail[]=[];
  constructor( private router: Router, private toastr: ToastrService,private authService: AuthService, private savedTrailsService: SavedTrailsService, private trailDetailService: TrailDetailService) { }

  ngOnInit(): void {
  
    //check user log in
    if(this.authService.loggenIn()){
      //add method calls here to fecth the saved trails  
      this.savedTrailsService.getSavedTrails()
      .then((trails : any) => {
        this.trails = trails as Trail[];
        }
      );
      this.toastr.success("List of Saved Trails");
    }else{
      this.router.navigate(['/'])
      this.toastr.warning("Please Register/Login to save trails");
    }
      window.scroll(0,0);
  }

}
