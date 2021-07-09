import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PagesModule } from './pages/pages.module';
import { FooterComponent } from './components/footer/footer.component';
import { PrivatePagesModule } from './private-pages/private-pages.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule, ScreenTrackingService, UserTrackingService} from '@angular/fire/analytics';
import { environment } from '../environments/environment';

import { AngularFireAuth, AngularFireAuthModule, LANGUAGE_CODE } from '@angular/fire/auth';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    PrivatePagesModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAnalyticsModule,
    AngularFireAuthModule
  ],
  providers: [
    UserTrackingService,
    ScreenTrackingService, 
    { provide: LANGUAGE_CODE, useValue: 'fr' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }