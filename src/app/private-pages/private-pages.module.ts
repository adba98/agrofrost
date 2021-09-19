import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivatePagesRoutingModule } from './private-pages-routing.module';

import { UserComponent } from './user/user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShoppingCardComponent } from './shopping-card/shopping-card.component';
import { DashboardOptionComponent } from './dashboard/dashboard-option/dashboard-option.component';

@NgModule({
  declarations: [
    UserComponent,
    DashboardComponent,
    DashboardOptionComponent,
    ShoppingCardComponent
  ],
  imports: [
    CommonModule,
    PrivatePagesRoutingModule,
  ]
})
export class PrivatePagesModule { }
