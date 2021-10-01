import { Component, ErrorHandler, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/auth';

import firebase from 'firebase/app';
import Swal from 'sweetalert2';

import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.scss'],
})
export class SinginComponent implements OnInit {
  public user: UserModel;
  public remindMe!: boolean;
  private routerRedirectUrl!: string;

    constructor(
    public auth: AngularFireAuth,
    private auth2: AuthService,
    private router: Router
  ) {
    
    this.user = new UserModel();
    this.remindMe = false;
   
    if (localStorage.getItem('user')) {
      this.user.email != localStorage.getItem('user');
    }
  }
  ngOnInit(): void {
    //firebase.auth()
    //firebase.auth().languageCode = 'es';
  }



  loginWithGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider();
    this.auth
      .signInWithPopup(provider)
      .then((result: any) => {
        /** @type {firebase.auth.OAuthCredential} */
        let credential = result.credential;
        if (credential != null && credential.accesToken != null) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          let token = credential.accessToken;
          // The signed-in user info.
          let user = result.user;
          console.log('se inicio con google');
        }
      })
      .catch((error) => {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // The email of the user's account used.
        let email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        let credential = error.credential;
        // ...
        console.log(error);
      });
  }
  loginWithFacebook() {
    this.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider());
    console.log('se inicio con Facebook');
  }

  loginBasicEmailAndPassword(form: NgForm) {
    if (form.invalid) return;

    // TODO: poner validadciones
    this.auth2.loginUserWithEmail(this.user).subscribe(
      (res:any) => {
        this.routerRedirectUrl = this.auth2.userTryToEnter || '/private';
        this.auth2.userTryToEnter = '';

        this.router.navigate([this.routerRedirectUrl]);

        if (this.remindMe) {
          localStorage.setItem('user', this.user.email);
        }
      },
      (err:any) => {
        console.log(err);

        let message = err.error.error.message;
        if (
          err.error.error.message == 'INVALID_PASSWORD' ||
          err.error.error.message == 'EMAIL_NOT_FOUND'
        ) {
          message = 'Correo o contraseña incorrecto';
        }

        Swal.fire({
          icon: 'error',
          text: message,
        });
      }
    );
  }

  logout() {
    this.auth.signOut();
  }
}