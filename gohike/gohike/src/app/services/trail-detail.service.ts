import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Trail } from '../trail';
import { SavedTrail } from '../trail';

@Injectable({
  providedIn: 'root'
})
export class TrailDetailService {


  private trailUrl = 'http://localhost:3000/api/trail';
  private customTrailUrl = 'http://localhost:3000/api/customTrail';
    constructor(private http:HttpClient){}

    getTrails(){
      return this.http.get<Trail[]>(this.trailUrl);
    }

    // getSeletedTrails(paramData:string): Observable<Trail[]>{
    //   return this.http.get<Trail[]>(this.customTrailUrl+'/'+paramData)
    // }

    getSingleTrail(trailId: string): Promise<any | Trail> {
      return this.http.get(this.trailUrl + '/' + trailId)
        .toPromise()
        .then(response => response as Trail)
        .catch(this.handleError);
    }
  
    
    // getTrails() {
    //     return this.http.get(this.trailUrl)
    //       .toPromise()
    //       .then(response => response as Trail[])
    //       .catch(this.handleError);
    //   }

      private handleError(error: any) {
        console.log("error");
    }
}
