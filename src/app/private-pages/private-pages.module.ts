import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivatePagesRoutingModule } from './private-pages-routing.module';
import { PostDetailComponent } from './post-detail/post-detail.component';


@NgModule({
  declarations: [
    PostDetailComponent
  ],
  imports: [
    CommonModule,
    PrivatePagesRoutingModule
  ]
})
export class PrivatePagesModule { }
