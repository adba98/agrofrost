import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DealsComponent } from './deals/deals.component';
import { SliderComponent } from './slider/slider.component';



@NgModule({
  declarations: [
    DealsComponent,
    SliderComponent
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    DealsComponent,
    SliderComponent
  ]
})
export class SharedModule { }
