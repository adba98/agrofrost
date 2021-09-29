import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdsenseModule } from 'ng2-adsense';

import { AdsSquareComponent } from './ads-square/ads-square.component';



@NgModule({
  declarations: [
    AdsSquareComponent
  ],
  imports: [
    CommonModule, 
   
    AdsenseModule.forRoot({
      adClient: 'ca-pub-1885720016268385',
    
    })
  ],
  exports:[
    AdsSquareComponent,    
  ]
})
export class AdsModule { }
