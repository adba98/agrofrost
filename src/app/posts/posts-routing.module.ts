import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { PostsComponent } from './pages/posts/posts.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { LayoutComponent } from './layout/layout.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { AuthGuard } from '../auth/guards/auth.guard';



const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      {
        path: '',
        component: PostsComponent
      },
      {
        path: 'view/:id',
        component: PostDetailComponent
      },
      {
        path: 'create',
        component: CreatePostComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class PostsRoutingModule { }
