import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { FeauturesComponent } from './feautures/feautures.component';
import { SingupComponent } from './singup/singup.component';
import { SinginComponent } from './singin/singin.component';
import { PricingComponent } from './pricing/pricing.component';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    FeauturesComponent,
    SingupComponent,
    SinginComponent,
    PricingComponent,
  ],
  imports: [
    CommonModule
  ], 
  exports: [
    HomeComponent,
    AboutComponent,
    FeauturesComponent,
    SingupComponent,
    SingupComponent,
    PricingComponent
  ]
})
export class PagesModule { }
