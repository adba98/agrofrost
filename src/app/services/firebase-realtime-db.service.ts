import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from '../posts/interfaces/post.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseRealtimeDBService {

  private url = 'https://agrofrost-a5c31-default-rtdb.firebaseio.com/api';
  constructor(private http: HttpClient) {
  }

  createPost(post: Post) {
    return this.http.post(`${this.url}/post.json`, post)
      .pipe(
      );
  }

  getPost(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.url}/post/${id}.json`).pipe(
      map((res: Post) => {
        let full: Post = res;
        full.id = id;
        return res
      })

    );



  }
  getAllPost(): Observable<Post[]> {
    return this.http.get(`${this.url}/post.json`)
      .pipe(
        map((data) => {

          let posts: Post[] = [];

          // iterate over json keys
          Object.entries(data).forEach(([key, value]) => {
            value['id'] = key;
            posts.push(value)
          });

          return posts;
        },
        ));
  }
}
