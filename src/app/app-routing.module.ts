import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AboutComponent } from './pages/about/about.component';
import { FeauturesComponent } from './pages/feautures/feautures.component';
import { HomeComponent } from './pages/home/home.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { SinginComponent } from './pages/singin/singin.component';
import { SingupComponent } from './pages/singup/singup.component';

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
    import('./pages/posts/posts.module').then((m) => m.PostsModule),
  },
  {
    path: 'p',
    loadChildren: () =>
    import('./private-pages/private-pages.module').then(
      (m) => m.PrivatePagesModule
      ),
      canActivate:[ AuthGuard]    // FIXME: Corregir usar canLoad
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
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })], // use hash to manage url on firebase
  exports: [RouterModule],
})
export class AppRoutingModule {}
