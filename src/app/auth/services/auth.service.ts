
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, subscribeOn, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { UserModel } from '../models/user.model';
import { UserService } from './user.service';



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
  readonly SS_EMAIL: string = 'email';

  userTryToEnter: string = '';
  public currentUser:SingUpOrIn | null = null;
  public userInfo!: UserModel;

  public changingLoginStatusSubject = new Subject<boolean>();
  public changingLoginStatus$ = this.changingLoginStatusSubject.asObservable();

  constructor(private http: HttpClient, private dbUsers:UserService) {
    if (this.isLogginIn('')) {
      this.changingLoginStatusSubject.next(true);
      console.log("sigue activvo");
    }
  }

  createUserWithEmail(user: UserModel) {
    //https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
    const body = {
      ...user, // extrae email and password, eduiante spread
      returtSecuredToken: true,
    };
    
    return this.http.post(`${this.url}:signUp?key=${this.apikey}`, body).pipe(
      map((res: any) => {
        if (res.idToken) {
          this.saveToken(res);

          let t : SingUpOrIn = res
          this.userInfo = user;
          this.dbUsers.create(t.localId,user).subscribe(r => console.log);
        }
        return res;
      })
    );
  }
  loginUserWithEmail(user: UserModel) {
    const body = {
      ...user, // extrae email and password, mediante spread
      returtSecuredToken: true,
    };

    // podrria hacerlo con verify password
    return this.http
      .post<SingUpOrIn>(`${this.url}:signInWithPassword?key=${this.apikey}`, body)
      .pipe(
        map((res:any) => {
          if (res?.idToken) {
            this.saveToken(res);
           

          }
          console.log(res);
          
          return res;
        })
      );
  }
  logout() {
    console.log("cierra sesion");
    localStorage.removeItem(this.LS_TOKENKEY);
    this.changingLoginStatusSubject.next(false);
    this.currentUser = null; 
  }

  private saveToken(tokenResponse:SingUpOrIn) {

    this.userToken = tokenResponse.idToken;

    localStorage.setItem(this.LS_TOKENKEY, tokenResponse.idToken);
    this.changingLoginStatusSubject.next(true);
  

    const exp: number = new Date().setSeconds(this.timeToLogout);
    localStorage.setItem(this.LS_EXPIRATIONTIME, exp.toString());

    this.currentUser= tokenResponse;
  }


  private readToken(): string {

    if (localStorage.getItem(this.LS_TOKENKEY)) {
      this.userToken = localStorage.getItem(this.LS_TOKENKEY) || "";
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

export interface SingUpOrIn{
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
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



