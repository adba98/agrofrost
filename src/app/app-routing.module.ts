import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import { AuthGuard } from './auth/guards/auth.guard';

import { AboutComponent } from './pages/about/about.component';
import { FeauturesComponent } from './pages/feautures/feautures.component';
import { HomeComponent } from './pages/home/home.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { ContactUsComponent } from './pages/contacus/contact-us.component';
import { AuthModule } from './auth/auth.module';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'auth',
    loadChildren: ()=>AuthModule,
    
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
    path: 'contactus',
    component: ContactUsComponent,
  },
  {
    path: 'posts',
    loadChildren: () =>
      import('./posts/posts.module').then((m) => m.PostsModule),
  },
  {
    path: 'private',
    loadChildren: () =>
      import('./private-pages/private-pages.module').then(
        (m) => m.PrivatePagesModule
      ),
    canLoad: [AuthGuard],
    canActivate: [ AuthGuard]
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })], // use hash to manage url on firebase
  exports: [RouterModule],
})
export class AppRoutingModule { }
