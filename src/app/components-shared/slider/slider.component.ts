import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  @Input('imgs') imgs !: string[]


  idxSlide: number=0; 
  constructor() { 

//    this.idxSlide = this.imgs.length
    this.idxSlide = 0
  }

  ngOnInit(): void {

    setInterval(()=>{

      if(this.imgs.length>1){
      this.idxSlide = (this.idxSlide+1)% this.imgs.length
    }

    },5000);
  }


  nextSlide(){
    this.idxSlide++; 
  }
  prevSlide(){
    this.idxSlide--; 
  }

  changeTo(i :number){
    this.idxSlide= i; 

  }

}
