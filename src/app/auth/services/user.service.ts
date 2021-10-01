import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 

import { UserModel } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private url = `${environment.firebaseConfig.databaseURL}/api/auth`;

  constructor(private http: HttpClient) { }

  create(uuid: string ,user: UserModel) {
    
    let payload = {
      [uuid]:user
     }
    return this.http.patch(`${this.url}.json`, payload);
  }

  findById( uuid:string){
    return this.http.get(`${this.url}/${uuid}.json`)
  }

}
