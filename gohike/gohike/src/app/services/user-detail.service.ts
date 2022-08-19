import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {

  private userUrl = 'http://localhost:3000/apiUser/user';

    constructor(private http:HttpClient){}

    getUsers(): Promise<void | User[]> {
        return this.http.get(this.userUrl)
          .toPromise()
          .then(response => response as User[])
          .catch(this.handleError);
      }

    private handleError(error: any) {
        console.log("error");
    }
    
    createUser(newUser: User): Promise<void | User> {
        return this.http.post(this.userUrl, newUser).toPromise()
          .then(response => response as User).catch(this.handleError);
          
      }

   }
