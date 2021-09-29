import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';


import { AgmCoreModule } from "@agm/core";
import { PostsRoutingModule } from './posts-routing.module';

import { CultivoPipe } from './pipes/Cultivo.pipe';
import { PostsComponent } from './pages/posts/posts.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductCardComponent } from './shared/product-card/product-card.component';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from '../components-shared/shared.module';
import { RelatedItemsComponent } from './shared/related-items/related-items.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { AdsenseModule } from 'ng2-adsense';
import { AdsModule } from '../ads/ads.module';


@NgModule({
  declarations: [
    PostsComponent,
    CreatePostComponent,
    PostDetailComponent,
    CultivoPipe,
    ProductCardComponent,
    LayoutComponent,
    RelatedItemsComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    AgmCoreModule,
    PostsRoutingModule,
    SharedModule,
    AdsModule
  ],
  providers:[
    TitleCasePipe
  ],
})
export class PostsModule { }
