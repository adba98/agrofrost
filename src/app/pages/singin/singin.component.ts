import { Component, ErrorHandler, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';

import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.scss'],
})
export class SinginComponent implements OnInit {
  ui = new firebaseui.auth.AuthUI(firebase.auth());

  constructor(public auth: AngularFireAuth) {}

  login() {

    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    console.log('se inicio con google');
    //this.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())
  }
  logout() {
    this.auth.signOut();
  }

  uiConfig = {
    callbacks: {
      // signInFailure callback must be provided to handle merge conflicts which
      // occur when an existing credential is linked to an anonymous user.

      signInSuccessWithAuthResult: function (
        authResult: any,
        redirectUrl: any
      ) {
        authResult;
        redirectUrl;
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return true;
      },
      /** 
      signInFailure: function(error: any) {
        // For merge conflicts, the error.code will be
        // 'firebaseui/anonymous-upgrade-merge-conflict'.
        if (error.code != 'firebaseui/anonymous-upgrade-merge-conflict') {
          return Promise.resolve();
        }
        // The credential the user tried to sign in with.
        var cred = error.credential;
        // Copy data from anonymous user to permanent user and delete anonymous
        // user.
        // ...
        // Finish sign-in after data is copied.
        return firebase.auth().signInWithCredential(cred);
      },*/
      uiShown: function () {
        // The widget is rendered.
        // Hide the loader.
        //document.getElementById('loader').style.display = 'none';
      },
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: '<url-to-redirect-to-on-success>',
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>',

    signInOptions: [
      // List of OAuth providers supported.
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        scopes: ['https://www.googleapis.com/auth/contacts.readonly'],
        customParameters: {
          // Forces account selection even when one account
          // is available.
          prompt: 'select_account',
        },
      },
      {
        provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        scopes: ['public_profile', 'email', 'user_likes', 'user_friends'],
        customParameters: {
          // Forces password re-entry.
          auth_type: 'reauthenticate',
        },
      },
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID, // Other providers don't need to be given as object.
      {
        provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        recaptchaParameters: {
          type: 'image', // 'audio'
          size: 'normal', // 'invisible' or 'compact'
          badge: 'bottomleft', //' bottomright' or 'inline' applies to invisible.
        },
        defaultCountry: 'CO', // Set default country to the United Kingdom (+44).
        // For prefilling the national number, set defaultNationNumber.
        // This will only be observed if only phone Auth provider is used since
        // for multiple providers, the NASCAR screen will always render first
        // with a 'sign in with phone number' button.
        defaultNationalNumber: '1234567890',
        // You can also pass the full phone number string instead of the
        // 'defaultCountry' and 'defaultNationalNumber'. However, in this case,
        // the first country ID that matches the country code will be used to
        // populate the country selector. So for countries that share the same
        // country code, the selected country may not be the expected one.
        // In that case, pass the 'defaultCountry' instead to ensure the exact
        // country is selected. The 'defaultCountry' and 'defaultNationaNumber'
        // will always have higher priority than 'loginHint' which will be ignored
        // in their favor. In this case, the default country will be 'GB' even
        // though 'loginHint' specified the country code as '+1'.
        loginHint: '+573XXXXXXX',
      },
    ],
    // Other config options...
  };
  ngOnInit(): void {
    firebase.auth().languageCode = 'es';

    this.ui.start('#firebaseui-auth-container', this.uiConfig);

    // Is there an email link sign-in?
    if (this.ui.isPendingRedirect()) {
      this.ui.start('#firebaseui-auth-container', this.uiConfig);
    }
    // This can also be done via:
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      this.ui.start('#firebaseui-auth-container', this.uiConfig);
    }
  }
}
