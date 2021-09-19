import { Component, OnInit } from '@angular/core';
import { FirebaseRealtimeDBService } from 'src/app/services/firebase-realtime-db.service';
import { Post } from '../../posts/interfaces/post.interface';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent implements OnInit {

  demandas = [{}];



  ofertas:Post[] = [];


  constructor(private db: FirebaseRealtimeDBService) { }

  ngOnInit(): void {
    this.db.getAllPost().subscribe(res => this.ofertas= res
    );
  }


}
