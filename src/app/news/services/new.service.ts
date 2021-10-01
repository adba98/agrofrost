import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewService {

  private url = "https://newsapi.org/v2/everything?apiKey=1cc810d05fa546c2b228cfd577159cc3&q=colombia AND agro&language=es&pageSize=100"
  //private url = "https://newsapi.org/v2/everything?apiKey=1cc810d05fa546c2b228cfd577159cc3&q=agricultura&qInTitle=agricultura";
  constructor(
    private http: HttpClient
  ) {

  }
  getAll(): Observable<Article[]> {
    // let params = new HttpParams();
    // params = params.set('apiKey', 'someid');
    // params = params.set('name', 'johndoe');
    //    console.log(params);


    return this.http.get<ReqNewsAPI>(this.url).pipe(
      map((res) => res.articles),
      catchError((err: HttpErrorResponse) => {
        let res = new Observable<Article[]>();
        if (err.status == 426) {
          console.log("Use alternative repo");
          res = this.getAllFB();
        }
        return res
      })
    )
  }

  private getAllFB(): Observable<Article[]> {
    return this.http.get<ReqNewsAPI>(`${environment.firebaseConfig.databaseURL}/api/news.json`).pipe(
      map(res => res.articles)
    );
  }

}

export interface ReqNewsAPI {
  status: string;
  totalResults: number;
  articles: Article[];
}

export interface Article {
  source: Source;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: Date;
  content: string;
}

export interface Source {
  id: null | string;
  name: string;
}

