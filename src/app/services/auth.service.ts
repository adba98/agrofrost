
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { UserRegisterModel, UserLoginModel } from '../models/user.model';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // documentacion https://firebase.google.com/docs/reference/rest/auth 
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts';
  private apikey = environment.firebaseConfig.apiKey;

  private userToken!: string;

  constructor(private http: HttpClient) {
    this.readToken();
  }

  createUserWithEmail(newUser: UserRegisterModel) {
    //https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
    const body = {
      ...newUser, // extrae email and password, eduiante spread
      returtSecuredToken: true,
    };

   return this.http.post(`${this.url}:signUp?key=${this.apikey}`,body )
    .pipe(
      map((res:any) => {
        if(res.idToken){
          this.saveToken(res?.idToken);
        }
        return res;
      })
    );
  }
  loginUserWithEmail(user: UserLoginModel) {
    const body = {
      ...user, // extrae email and password, eduiante spread
      returtSecuredToken: true,
    };

    // podrria hacerlo con verify password
    return this.http
      .post(`${this.url}:signInWithPassword?key=${this.apikey}`, body)
      .pipe(
        map((res:any) => {
          if(res.idToken){
            this.saveToken(res?.idToken);
          }
          return res;
        })
      );
  }

  private saveToken (idToken: string){
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }
  private readToken():string {
    
    if(localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token') || "";
    }else{
      this.userToken = '';
    }
    return this.userToken;
  }
}

export interface SingOK {
  kind:         string;
  idToken:      string;
  email:        string;
  refreshToken: string;
  expiresIn:    string;
  localId:      string;
}




//// 
export interface  SingUpError {
  error: WelcomeError;
}

export interface WelcomeError {
  code:    number;
  message: string;
  errors:  ErrorElement[];
}

export interface ErrorElement {
  message: string;
  domain:  string;
  reason:  string;
}



