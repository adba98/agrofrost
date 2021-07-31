import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivatePagesRoutingModule } from './private-pages-routing.module';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [PostDetailComponent, UserComponent],
  imports: [CommonModule, PrivatePagesRoutingModule],
})
export class PrivatePagesModule {}
