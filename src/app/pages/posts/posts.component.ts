import { Component, OnInit } from '@angular/core';
import { FirebaseRealtimeDBService } from '../../services/firebase-realtime-db.service';
import { Post } from '../../models/post.interface';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  public posts!: Post[];


  constructor(
    private db: FirebaseRealtimeDBService
  ) {
    this.db.getAllPost().subscribe((res) => this.posts = res);
  }

  ngOnInit(): void { }
}
