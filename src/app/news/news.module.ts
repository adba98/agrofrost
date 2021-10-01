import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostNewComponent } from './post-new/post-new.component';



@NgModule({
  declarations: [
    PostNewComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    PostNewComponent
  ]
})
export class NewsModule { }
