import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Cultivo } from 'src/app/components/models/RestAgricultureResponse.interace';
import { AgricultureService } from '../../services/agriculture.service';
import { FirebaseRealtimeDBService } from '../../services/firebase-realtime-db.service';


@Component({
  selector: 'app-create-publication',
  templateUrl: './create-publication.component.html',
  styleUrls: ['./create-publication.component.scss'],
})
export class CreatePublicationComponent implements OnInit {
  public forma!: FormGroup;

  public cultivos: Cultivo[] = [];
  public termino: string = '';
  public hayError = false;

  lat = 51.678418;
  lng = 7.809007;
  zoom = 1; 

  public cultivoSeleccionado: Cultivo | null = null;

  deBouncer: Subject<string> = new Subject();

  constructor(
    private fb: FormBuilder,
    private sAgriculture: AgricultureService,
    private sFDB: FirebaseRealtimeDBService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.deBouncer.pipe(debounceTime(3000)).subscribe((term) => {
      console.log(term);
    });
  }

  createForm() {
    this.forma = this.fb.group({
      tipo_post: ['', [Validators.required], ''],
      cultivo: ['', [Validators.required], ''],
      descripcion: ['', [Validators.required, Validators.minLength(10)], ''],
      cantidad: ['', [Validators.required, Validators.minLength(1),Validators.min(1)], ''],
      precio: ['', [Validators.required, Validators.minLength(3),Validators.min(100)], ''],
      transporte: ['', [Validators.required], ''],
      organico: ['', [Validators.required], ''],
      imagenes: this.fb.group({
        a: ['d', ,],
        b: ['d', ,],
      }),
    });

    // municipio:   ['',[Validators.required, Validators.minLength(3)],''],
  }

  teclaPresionada() {
    this.deBouncer.next(this.termino);
  }

  buscarPorTermino() {
    this.termino = this.forma.get('cultivo')?.value;
    this.sAgriculture.getCultivosByTerm(this.termino.trim()).subscribe(
      (cultivos) => {
        if (cultivos.length == 0) {
          this.hayError = true;
        }
        this.cultivos = cultivos;
      },
      (err) => {
        this.cultivos = [];
        this.hayError = true;
      }
    );
  }
  cambiarTermino() {
    this.cultivoSeleccionado = null;
    this.forma.patchValue({ cultivo: null });
    this.forma.get('cultivo')?.enable();
    this.cultivos = [];
  }
  
  onKeyPressOnlyNumbers(event: any) {
    const regexpNumber = /[0-9\+\-\ ]/;
    let inputCharacter = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !regexpNumber.test(inputCharacter)) {
      event.preventDefault();
    }
  }
  selectProducto(cultivo: Cultivo) {
    this.cultivoSeleccionado = cultivo;
    this.forma.get('cultivo')?.disable();
    this.forma.patchValue({
      cultivo: `${cultivo.desagregaci_n_regional_y} - ${cultivo.grupo_de_cultivo}`,
    });
  }
  campoEsInvalido(control:string){
    return this.forma.get(control)?.invalid && this.forma.get(control)?.touched;
  }

  savePost() {
    this.forma.markAllAsTouched();
    if (this.forma.invalid) {
      return;
    }

    this.sFDB.createPost(this.forma.value).subscribe((res) => {
      console.info(res);
    });
  }
}
