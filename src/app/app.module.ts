import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';



import { AngularFireModule } from '@angular/fire';
import {
  AngularFireAnalyticsModule,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';


import {
  AngularFireAuth,
  AngularFireAuthModule,
  LANGUAGE_CODE,
} from '@angular/fire/auth';

import { AgmCoreModule } from "@agm/core";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components-layout/navbar/navbar.component';
import { PagesModule } from './pages/pages.module';
import { FooterComponent } from './components-layout/footer/footer.component';
import { PrivatePagesModule } from './private-pages/private-pages.module';



//import { AgmCoreModule } from '@agm/core';

import { environment } from '../environments/environment';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { AuthService } from 'src/app/auth/services/auth.service';

@NgModule({
  declarations: [AppComponent, NavbarComponent, FooterComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
  
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAnalyticsModule,
    AngularFireAuthModule,

    AgmCoreModule.forRoot(
      {
        apiKey: environment.gcpApi.api.apiKey,
        libraries: ['places']
      }
    ),

    AppRoutingModule,
    AuthModule,
    PagesModule,
    PrivatePagesModule,
    PostsModule
  ],
  providers: [
    UserTrackingService,
    ScreenTrackingService,
    { provide: LANGUAGE_CODE, useValue: 'fr' },
    
    AuthService
  ],
  exports: [
    AgmCoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
