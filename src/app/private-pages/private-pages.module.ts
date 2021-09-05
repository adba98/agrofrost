import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AgmCoreModule } from "@agm/core";

import { PrivatePagesRoutingModule } from './private-pages-routing.module';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { UserComponent } from './user/user.component';
import { CreatePublicationComponent } from './create-publication/create-publication.component';
import { environment } from 'src/environments/environment';
import { CultivoPipe } from '../pipes/Cultivo.pipe';

@NgModule({
  declarations: [
    PostDetailComponent,
    CreatePublicationComponent,
    UserComponent,

    CultivoPipe
  ],
  providers: [
    TitleCasePipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    PrivatePagesRoutingModule,

    AgmCoreModule

  ],
  exports: [
    CultivoPipe
  ]
})
export class PrivatePagesModule { }
