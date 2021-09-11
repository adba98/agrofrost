
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { UserLoginModel, UserRegisterModel } from '../models/user.model';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // documentacion https://firebase.google.com/docs/reference/rest/auth
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts';

  private timeToLogout = environment.authTimeValidityToken;
  private apikey = environment.firebaseConfig.apiKey;

  private userToken!: string;

  readonly LS_TOKENKEY: string = 'token';
  readonly LS_EXPIRATIONTIME: string = 'expiration';

  userTryToEnter: string = '';

  public changingLoginStatusSubject = new Subject<boolean>();
  public changingLoginStatus$ = this.changingLoginStatusSubject.asObservable();

  constructor(private http: HttpClient) {
    if (this.isLogginIn('')) {
      this.changingLoginStatusSubject.next(true);
      console.log("sigue activvo");
    }
  }

  createUserWithEmail(newUser: UserRegisterModel) {
    //https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
    const body = {
      ...newUser, // extrae email and password, eduiante spread
      returtSecuredToken: true,
    };

    return this.http.post(`${this.url}:signUp?key=${this.apikey}`, body).pipe(
      map((res: any) => {
        if (res.idToken) {
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
        map((res: any) => {
          if (res.idToken) {
            this.saveToken(res?.idToken);
          }
          return res;
        })
      );
  }
  logout() {
    console.log("cierra sesion");
    localStorage.removeItem(this.LS_TOKENKEY);
    this.changingLoginStatusSubject.next(false);
  }

  private saveToken(idToken: string) {
    this.userToken = idToken;

    localStorage.setItem(this.LS_TOKENKEY, idToken);
    this.changingLoginStatusSubject.next(true);
  

    const exp: number = new Date().setSeconds(this.timeToLogout);
    localStorage.setItem(this.LS_EXPIRATIONTIME, exp.toString());
  }


  private readToken(): string {

    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token') || "";
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }

  isLogginIn(url: string = ''): boolean {
    if (this.readToken().length < 2) {
      this.userTryToEnter = url;
      return false;
    } else {
      const hoy = new Date();
      if (localStorage.getItem(this.LS_EXPIRATIONTIME)) {
        const exp = Number(localStorage.getItem(this.LS_EXPIRATIONTIME));
        if (exp > hoy.getTime()) {
          return true;
        }
      }
      this.userTryToEnter = url;
      return false;
    }
  }
}

export interface SingOK {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}




//// 
export interface SingUpError {
  error: WelcomeError;
}

export interface WelcomeError {
  code: number;
  message: string;
  errors: ErrorElement[];
}

export interface ErrorElement {
  message: string;
  domain: string;
  reason: string;
}



