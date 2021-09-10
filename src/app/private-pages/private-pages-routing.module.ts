import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { CreatePublicationComponent } from './create-publication/create-publication.component';


const routes: Routes = [
  {
    path: '',
    component: UserComponent,
  },{
    path:'create-post',
    component: CreatePublicationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivatePagesRoutingModule {}
