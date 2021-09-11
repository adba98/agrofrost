import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';


import { AgmCoreModule } from "@agm/core";
import { PostsRoutingModule } from './posts-routing.module';
import { CultivoPipe } from './pipes/Cultivo.pipe';
import { PostsComponent } from './pages/posts/posts.component';
import { CreatePublicationComponent } from './pages/create-post/create-post.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    PostsComponent,
    CreatePublicationComponent,
    PostDetailComponent,
    CultivoPipe


  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    AgmCoreModule,
    


    PostsRoutingModule
  ],
  providers:[
    TitleCasePipe
  ],
})
export class PostsModule { }
