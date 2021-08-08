import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { FeauturesComponent } from './pages/feautures/feautures.component';
import { HomeComponent } from './pages/home/home.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { SinginComponent } from './pages/singin/singin.component';
import { SingupComponent } from './pages/singup/singup.component';
import { CreatePublicationComponent } from './private-pages/create-publication/create-publication.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'feautures',
    component: FeauturesComponent,
  },
  {
    path: 'pricing',
    component: PricingComponent,
  },
  {
    path: 'posts',
    loadChildren: () =>
      import('./pages/posts/posts.module').then((m) => m.PostsModule)
  },
  {
// FIXME: Corregir seccion privada
    path: 'p', 
    loadChildren: () =>
      import('./private-pages/private-pages.module').then((m) => m.PrivatePagesModule)
  },
  {
    path: 'singin',
    component: SinginComponent,
  },
  {
    path: 'singup',
    component: SingupComponent,
  }, 
  {
    path: 'c',
    component: CreatePublicationComponent,
  }, 
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})], // use hash to manage url on firebase
  exports: [RouterModule],
})
export class AppRoutingModule {}
