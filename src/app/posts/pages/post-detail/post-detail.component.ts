import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseRealtimeDBService } from 'src/app/services/firebase-realtime-db.service';
import Swal from 'sweetalert2';
import { Post } from '../../interfaces/post.interface';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})


export class PostDetailComponent implements OnInit {

  dataIsLoaded: Promise<boolean> | undefined | boolean; // use to render teh data 

  public post!: Post;
  constructor(private activateRoute: ActivatedRoute, private db: FirebaseRealtimeDBService, private auth: AuthService) {

    this.activateRoute.params.subscribe((params) => {
      let { id } = params;
      this.db.getPost(id).subscribe((r) => {
        if (r != null) {
          this.dataIsLoaded = true;
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

  showOwnerInfo() {

    let body: string = `
    <strong>Correo: </strong> ${this.post.post_owner.correo}
      <br>
      Para ver más información de contacto debe iniciar Sesión
    `;


    if (this.auth.isLogginIn()) {

      body = `
       <strong> Nombre: </strong> ${this.post.post_owner.nombre}
        <br>
       <strong>Celular: </strong> ${this.post.post_owner.celular}
        <br>
       <strong>Correo: </strong> ${this.post.post_owner.correo}
       <br>
      `;

    }
    Swal.fire({
      title: "Datos de Contacto",
      html: body
    })
  }
}
