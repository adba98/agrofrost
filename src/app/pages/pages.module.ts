import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { FeauturesComponent } from './feautures/feautures.component';
import { SingupComponent } from './singup/singup.component';
import { SinginComponent } from './singin/singin.component';
import { PricingComponent } from './pricing/pricing.component';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CultivoPipe } from '../pipes/Cultivo.pipe';

import { TestimonialsComponent } from './testimonials/testimonials.component';
import { ServicesPageComponent } from './services-page/services-page.component';
import { ContactUsComponent } from './contacus/contact-us.component';
import { SharedModule } from '../components/shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    FeauturesComponent,
    SingupComponent,
    SinginComponent,
    PricingComponent,
    ContactUsComponent,
    TestimonialsComponent,
    ServicesPageComponent,
  ],
  imports: [CommonModule, [RouterModule], FormsModule,
    SharedModule],
  exports: [
    HomeComponent,
    AboutComponent,
    FeauturesComponent,
    SingupComponent,
    SingupComponent,
    PricingComponent,
  ],
})
export class PagesModule { }
