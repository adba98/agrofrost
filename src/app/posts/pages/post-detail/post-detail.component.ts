import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseRealtimeDBService } from 'src/app/services/firebase-realtime-db.service';
import Swal from 'sweetalert2';
import { Post } from '../../interfaces/post.interface';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})


export class PostDetailComponent implements OnInit {

  dataIsLoaded: Promise<boolean> | undefined | boolean; // use to render teh data 

  public post!: Post;
  constructor(private activateRoute: ActivatedRoute, private db: FirebaseRealtimeDBService) {
    
    this.activateRoute.params.subscribe((params) => {
      let { id } = params;
      this.db.getPost(id).subscribe((r) => {
        if (r != null) {
          this.dataIsLoaded= true;
         // this.dataIsLoaded= Promise.resolve(true);
          this.post = r;

        }

      }, (err) => {

        Swal.fire(
          {
            icon: 'error',
            title: 'Oops...',
            text: 'El post ya no existe',
            footer: '<a href="/">Volver al Inicio</a>'
          }
        )
      });

    });
  }


  ngOnInit(): void {

  }
}
