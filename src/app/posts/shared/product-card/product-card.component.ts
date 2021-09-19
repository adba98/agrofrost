import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../interfaces/post.interface';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
;
  @Input() post !: Post;

  constructor() { }

  ngOnInit(): void {
  }

}
