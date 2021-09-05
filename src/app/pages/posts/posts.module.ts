import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { CultivoPipe } from '../../pipes/Cultivo.pipe';
import { PrivatePagesModule } from '../../private-pages/private-pages.module';

@NgModule({
  declarations: [PostsComponent,
  
  ],
  imports: [CommonModule, PostsRoutingModule,
    PrivatePagesModule

  ],
  providers: [

  ]

})

export class PostsModule { }
