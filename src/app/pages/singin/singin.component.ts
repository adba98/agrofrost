import { Component, ErrorHandler, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';

import firebase from 'firebase/app';

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.scss'],
})
export class SinginComponent implements OnInit {
  constructor(public auth: AngularFireAuth) {}
  ngOnInit(): void {
    //firebase.auth()
    //firebase.auth().languageCode = 'es';
  }

  loginWithEmailAndPassword() {}

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

  logout() {
    this.auth.signOut();
  }
}
