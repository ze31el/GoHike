import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SavedTrail } from '../trail';

@Injectable({
  providedIn: 'root'
})
export class SavedTrailsService {

  private savedTrailUrl = 'http://localhost:3000/apiSavedTrail/savedTrails';

    constructor(private http:HttpClient){}

    getSavedTrails(): Promise<void | SavedTrail[]> {
        return this.http.get(this.savedTrailUrl)
          .toPromise()
          .then(response => response as SavedTrail[])
          .catch(this.handleError);
      }

      getSingleSavedTrail(trailname: string): Promise<any | SavedTrail> {
        return this.http.get(this.savedTrailUrl + '?trailname=' + trailname) //"Trail 10" //trailname
          .toPromise()
          .then(response => response as SavedTrail)
          .catch(this.handleSavedTrailError);
      }
    private handleError(error: any) {
        console.log("error");
    }
    
    private handleSavedTrailError(error: any) {
      console.log("Trail data not present in saved table.");
  }

    createSaveTrail(newSavedTrail: SavedTrail): Promise<void | SavedTrail> {
        return this.http.post(this.savedTrailUrl, newSavedTrail).toPromise()
          .then(response => response as SavedTrail).catch(this.handleError);
          
      }

      deleteSavedTrail(savedTrailId: string): Promise<void | SavedTrail> {
        return this.http.delete(this.savedTrailUrl + '/' + savedTrailId).toPromise()
          .then(response => response as SavedTrail).catch(this.handleError);
          
      }

      getSingleSavedTrailById(savedTrailId: string): Promise<any | SavedTrail> {
        return this.http.get(this.savedTrailUrl + '/?trailname=' + savedTrailId) //"Trail 10" //trailname
          .toPromise()
          .then(response => response as SavedTrail)
          .catch(this.handleSavedTrailError);
      }
}
