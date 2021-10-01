import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { Subject } from 'rxjs';
import { debounceTime, timeout } from 'rxjs/operators';


import { Geocoder, MapsAPILoader, MouseEvent } from '@agm/core';
// import { google } from '@agm/core/services/google-maps-types';
import { includes, values } from 'lodash';

import Swal from 'sweetalert2';
import { Cultivo } from 'src/app/models/RestAgricultureResponse.interace';
import { Market } from './maket.class';
import { AgricultureService } from 'src/app/services/agriculture.service';
import { FirebaseRealtimeDBService } from 'src/app/services/firebase-realtime-db.service';
import { DepatamentosYmunicipiosService, MunicipioInfo } from 'src/app/services/depatamentos-ymunicipios.service';
import { GeoCode, Post, Caracteristicas, Ubicacion, UserInfo } from '../../interfaces/post.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  public forma!: FormGroup;

  public cultivos: Cultivo[] = [];
  public termino: string = '';
  public hayError = false;

  public market: Market;
  zoom = 8;

  public cultivoSeleccionado: Cultivo | null = null;

  deBouncer: Subject<string> = new Subject();

  isImageSaved = false;
  cardImageBase64 = "";

  @ViewChild('search')
  public searchElementRef!: ElementRef;
  address: string = "";
  private geoCoder!: google.maps.Geocoder;

  municipios: string[] = [];
  imageError!: string;

  imagenesBase64: string[];

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private fb: FormBuilder,
    private sAgriculture: AgricultureService,
    private sFDB: FirebaseRealtimeDBService,
    private sDM: DepatamentosYmunicipiosService,
    private sAuth: AuthService
  ) {

    this.createForm();
    this.market = new Market();
    this.imagenesBase64 = [];

  }


  ngOnInit(): void {
    this.deBouncer.pipe(debounceTime(3000)).subscribe((term) => {
      console.log(term);

      //load Places Autocomplete
      this.mapsAPILoader.load().then(() => {
        this.setCurrentLocation();
        this.geoCoder = new google.maps.Geocoder();

        let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef?.nativeElement);
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            //get the place result
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();

            //verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }

            //set latitude, longitude and zoom
            this.market.lat = place.geometry.location.lat();
            this.market.long = place.geometry.location.lng();
            this.zoom = 12;
          });
        });
      });


    });
    this.sDM.getMunicipiosByDepartamento().subscribe((data) => {
      this.municipios = data.map((m: MunicipioInfo) => m?.municipio || '');
      this.municipios = this.municipios.sort();

      this.municipios.unshift(' -- Seleccione un Municipio --');
    });
  }

  createForm() {
    this.forma = this.fb.group({
      tipo_post: ['', [Validators.required], ''],
      cultivo: ['', [Validators.required, Validators.minLength(1)], ''],
      descripcion: ['', [Validators.required, Validators.minLength(10)], ''],
      cantidad: ['', [Validators.required, Validators.minLength(1), Validators.min(1)], ''],
      precio: ['', [Validators.required, Validators.minLength(3), Validators.min(100)], ''],
      transporte: ['', [Validators.required], ''],
      organico: ['', [Validators.required], ''],
      exportacion: ['', [Validators.required], ''],
      municipio: ['', [Validators.required,], ''],
      direccion: ['', [Validators.required,], ''],
      celular: ['', [Validators.required,], ''],
    });
    // imagenes: this.fb.array([['',Validators.required],['sdds',Validators.required]]),

  }
  get imagenes(): FormArray {
    return this.forma.get('imagenes') as FormArray;
  }

  insertarNuevaImagen() {
    this.imagenes.push(
      this.fb.control('', Validators.required)
    );
    /** upload with mutiple values
    this.imagenes.push(
      this.fb.group ({
        
        des:['', Validators.required,''],
       file:['',,]
      
      })
    );
    **/
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
      cultivo: this.cultivoSeleccionado,
      //  cultivo: `${cultivo.desagregaci_n_regional_y} - ${cultivo.grupo_de_cultivo}`,
    });
  }

  campoEsInvalido(control: string) {
    return this.forma.get(control)?.invalid && this.forma.get(control)?.touched;
  }

  colocarCoordenada(evento: any) {

    console.log(evento);

    this.market.lat = evento.coords.lat;
    this.market.long = evento.coords.lng;
  }

  savePost() {
    this.forma.markAllAsTouched();
    if (this.forma.invalid) {
      Swal.fire('Revisa los datos ingresados', 'Existe uno o varios datos invalidos dentro del formulario', 'error');
      return;
    }
    if (this.cultivoSeleccionado == null) {
      Swal.fire('Error', 'No se ha seleccionado cultivo ', 'error');
      return;
    }



    let data_geolocalizacion: GeoCode = {
      lat: this.market.lat,
      lng: this.market.long,
    };
    let data_ubicacion: Ubicacion = {
      departamento: 'Cundinamarca',
      municipio: this.forma.get('municipio')!.value,
      direccion: this.forma.get('direccion')!.value,
      geolocalizacion: data_geolocalizacion,
    };

    let caracteristicas: Caracteristicas ={

      organico: (this.forma.get('organico')!.value) == "Si" ? true : false,
      transporte: (this.forma.get('transporte')!.value == "Si") ? true : false,
      exportacion : (this.forma.get('transporte')!.value == "Si") ? true : false,
    }
    let data_user: UserInfo = {
      celular: this.forma.get('celular')!.value,
      correo: this.sAuth.currentUser!.email,
      nombre: `${this.sAuth.userInfo.firstName } ${this.sAuth.userInfo.lastName}`
      
    }

    

    let body: Post = {
      tipo_post: this.forma.get('tipo_post')!.value,
      fecha_post: new Date,
      cultivo_info: this.cultivoSeleccionado,
      cantidad: this.forma.get('cantidad')!.value,
      precio: this.forma.get('precio')!.value,
      descripcion: this.forma.get('descripcion')!.value,
      imgs: this.imagenesBase64,
      caracteristicas: caracteristicas,
      ubicacion: data_ubicacion,
      post_owner: data_user,
    };

    Swal.fire({
      icon: 'info',
      text: 'Almacenando publicación',
      allowOutsideClick: false
    });

    this.sFDB.createPost(body).subscribe((res) => {
      setTimeout(() => {
        Swal.close()
      },
        5000
      );

      // this.router.navigate(['/home']);

      if (res) {
        Swal.fire(
          'Proceso Exitoso!',
          'Se almaceno correctamente la información  {{res | json }}',
          'success'
        )
      }

    });
  }
  fileChangeEvent(fileInput: any) {
    if (fileInput.target?.files && fileInput.target?.files[0]) {
      // verificar dimension
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      if (!(includes(allowed_types, fileInput.target.files[0].type))) {
        this.imageError = 'El tipo de formato no es soportado, solo se pueden subir arhivos en formato ( JPG | PNG )';
        return;
      }
      if (fileInput.target.files[0].size > max_size) {
        this.imageError = 'Excede el tamaño del archivo' + max_size / 1000 + 'Mb';
        return;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        console.log(e);

        const image = new Image();
        // e.target trae la imagen en formato base 64
        image.src = e.target.result;
        image.onload = (rs: any) => {

          //FIXME;  corregir tamanio        
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];


          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              `La dimension maxiam soportada ${max_height} - ${max_width}  'px`;
            return;
          } else {
            this.isImageSaved = true;
            this.imagenesBase64.push(image.src);
          }
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
  
  eliminarImagen(value: string) {
    this.imagenesBase64 = this.imagenesBase64.filter(item => item !== value)
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.market.lat = position.coords.latitude;
        this.market.long = position.coords.longitude;
        this.zoom = 15;
        this.getAddress(this.market.lat, this.market.long);
      });
    }
  }
  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.market.lat = $event.coords.lat;
    this.market.long = $event.coords.lng;

    this.getAddress(this.market.lat, this.market.long);
  }

  getAddress(latitude: number, longitude: number) {
    this.geoCoder = new google.maps.Geocoder();
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results: any, status: any) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }
}
