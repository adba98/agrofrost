import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AgmCoreModule } from "@agm/core";

import { PrivatePagesRoutingModule } from './private-pages-routing.module';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { UserComponent } from './user/user.component';
import { CreatePublicationComponent } from './create-publication/create-publication.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    PostDetailComponent,
    CreatePublicationComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PrivatePagesRoutingModule,

    AgmCoreModule.forRoot(environment.gcpApi.api),
    
  ]
})
export class PrivatePagesModule {}
