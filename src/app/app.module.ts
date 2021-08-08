import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PagesModule } from './pages/pages.module';
import { FooterComponent } from './components/footer/footer.component';
import { PrivatePagesModule } from './private-pages/private-pages.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';


//import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    PagesModule,
    PrivatePagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
