import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { NewService, ReqNewsAPI, Article } from '../services/new.service';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.scss']
})
export class PostNewComponent implements OnInit {


  news!: Article[];
  constructor(private sNews: NewService) { }

  ngOnInit(): void {
    this.sNews.getAll().pipe(
      take(1)
    ).subscribe((req) => {
      this.news = req
    });

  }

  showShortDesciption = true;

  alterDescriptionText() {
     this.showShortDesciption = !this.showShortDesciption
}


}
