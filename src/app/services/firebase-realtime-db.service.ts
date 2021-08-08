import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseRealtimeDBService {

  
  private url = 'https://agrofrost-a5c31-default-rtdb.firebaseio.com/api' ; 
  constructor(private http: HttpClient) { 

  }


  createPost( post:any ){
    return this.http.post(`${this.url}/post.json`,post)
    .pipe(
      tap()
    ); 

  }
}
