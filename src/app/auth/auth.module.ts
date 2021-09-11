import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthService } from './services/auth.service';

import { SinginComponent } from './pages/singin/singin.component';
import { SingupComponent } from './pages/singup/singup.component';
import { AuthRoutingModule } from './auth-routing.module';



@NgModule({
  declarations: [
    SinginComponent,
    SingupComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    AuthRoutingModule
  ],
  providers:[
   // AuthService FIXME: Porque asi si funciona https://stackoverflow.com/questions/68276680/angular-2-rxjs-subject-next-not-working-in-some-cases/69122864#69122864
  ],

  exports:[
    SinginComponent,
    SingupComponent
  ]
})
export class AuthModule { }
