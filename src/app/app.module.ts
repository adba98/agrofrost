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
import { NavbarComponent } from './components/navbar/navbar.component';
import { PagesModule } from './pages/pages.module';
import { FooterComponent } from './components/footer/footer.component';
import { PrivatePagesModule } from './private-pages/private-pages.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';


//import { AgmCoreModule } from '@agm/core';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, NavbarComponent, FooterComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAnalyticsModule,
    AngularFireAuthModule,

    AgmCoreModule.forRoot(environment.gcpApi.api),

    AppRoutingModule,
    PagesModule,
    PrivatePagesModule,
  ],
  providers: [
    UserTrackingService,
    ScreenTrackingService,
    { provide: LANGUAGE_CODE, useValue: 'fr' },
  ],
  bootstrap: [AppComponent] 
})
export class AppModule {}
