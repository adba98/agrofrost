import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PrivatePagesRoutingModule } from './private-pages-routing.module';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { CreatePublicationComponent } from './create-publication/create-publication.component';



@NgModule({
  declarations: [
    PostDetailComponent,
    CreatePublicationComponent
  ],
  imports: [
    CommonModule,
    PrivatePagesRoutingModule,
    ReactiveFormsModule
    
  ]
})
export class PrivatePagesModule { }
