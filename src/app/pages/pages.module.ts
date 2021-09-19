import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { FeauturesComponent } from './feautures/feautures.component';
import { PricingComponent } from './pricing/pricing.component';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { TestimonialsComponent } from './testimonials/testimonials.component';
import { ServicesPageComponent } from './services-page/services-page.component';
import { ContactUsComponent } from './contacus/contact-us.component';
import { SharedModule } from '../components-shared/shared.module';
import { CultivoPipe } from '../posts/pipes/Cultivo.pipe';
import { PostsModule } from '../posts/posts.module';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    FeauturesComponent,
    PricingComponent,
    ContactUsComponent,
    TestimonialsComponent,
    ServicesPageComponent,
  ],
  imports: [CommonModule, [RouterModule], FormsModule,
    SharedModule,
  PostsModule
  ],
  
  exports: [
    HomeComponent,
    AboutComponent,
    FeauturesComponent,
    PricingComponent,
  ],
})
export class PagesModule { }
