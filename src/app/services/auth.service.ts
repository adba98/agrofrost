
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { UserRegisterModel } from '../models/user.model';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts';
  private apikey = environment.firebaseConfig.apiKey;

  constructor(private http: HttpClient) {}

  createUserWithEmail(newUser: UserRegisterModel) {
    const body = {
      ...newUser, // extrae email and password, eduiante spread
      returtSecuredToken: true,
    };

    this.http.post(`${this.url}:signUp?key=${this.apikey}`,body )
    .subscribe(
       (res) => {
         //: SingUpOK 
       console.log(res);
    },
      (err)=> { 
         // SingUpError
          console.log(err);
          console.log(err.error.error.message)
        })
  
  }
}





export interface SingUpOK {
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



