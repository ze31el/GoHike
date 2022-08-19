import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {TrailDetailService} from '../services/trail-detail.service';
import { Activity, Trail } from '../trail';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers:[TrailDetailService]
})
export class HeaderComponent implements OnInit {

  public trails: any[]=[];
  public activityData: any[]=[];
  public spaceVar = '& ';
  public trailsCity : Trail[] = [];
  public trailsName : Trail[] = [];
  public trailsActivity: Trail[] = [];
  showTrails: boolean =false;
  showCity: boolean =false;
  showName: boolean =false;
  showActivity: boolean = false;
  searchValue:any;
  status: boolean = false;
  statusCity: boolean = false;
  statusActivities: boolean = false;
  statusTrail: boolean = false;

  @ViewChild("allData")
  allData!: ElementRef;

  constructor(private trailDetailService : TrailDetailService, private route: ActivatedRoute,
    public authService : AuthService) { }

  ngOnInit(): void {
    this.status = true;
    this.statusCity = false;
    this.statusActivities = false;
    this.statusTrail = false;
    this.showCity = true;
    this.showTrails =  false;
    this.showName = true;
    this.showActivity = true;
    //this.allData.nativeElement.innerHTML.class = "allDataStyle";
    this.trailDetailService.getTrails().subscribe((response) =>{
      this.trails= response;
      
    })
    window.scroll(0,0);
  }


  city(){
    this.status = false;
    this.statusCity = true;
    this.statusActivities = false;
    this.statusTrail = false;
    this.showTrails =  true;
    this.showCity = false;
    this.showName = true;
    this.showActivity = true;
    this.trailDetailService.getTrails().subscribe((response) =>{
      this.trailsCity= response;
    })
  }

  trail(){
    this.status = false;
    this.statusCity = false;
    this.statusActivities = false;
    this.statusTrail = true;
    this.showTrails =  true;
    this.showCity = true;
    this.showName = false;
    this.showActivity = true;
    this.trailDetailService.getTrails().subscribe((response) =>{
      this.trailsName= response;
    })
  }

  activities(){
    this.status = false;
    this.statusCity = false;
    this.statusActivities = true;
    this.statusTrail = false;
    this.showTrails =  true;
    this.showCity = true;
    this.showName = true;
    this.showActivity = false;
    this.trailDetailService.getTrails().subscribe((response) =>{
      this.trailsActivity= response;
    })
  }

  Search(){
    if(this.searchValue == ""){
      this.ngOnInit();
    }else{
      this.trails = this.trails.filter(res => {
        return (res.name.toLocaleLowerCase().includes(this.searchValue.toLowerCase()) ||
        res.location.toLocaleLowerCase().includes(this.searchValue.toLowerCase()));
      });
    }
  }

  // filter(){
  //   this.activityData = this.activityData.filter((item, i, ar) => ar.indexOf(item) === i);
  // }
 
}
