import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from "@angular/router"
import { UserRegisterModel } from 'src/app/models/user.model';
import { AuthService } from '../../services/auth.service';
import {
  DepatamentosYmunicipiosService,
  MunicipioInfo,
} from 'src/app/services/depatamentos-ymunicipios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss'],
})
export class SingupComponent implements OnInit {
  public user: UserRegisterModel;
  public acceptTerms;
  municipios: string[] = [];

  constructor(
    private dmSeervice: DepatamentosYmunicipiosService,
    private auth:AuthService,
    private router: Router
    
    ) {
    this.user = new UserRegisterModel();
    this.acceptTerms= false;
  }

  ngOnInit(): void {
    this.dmSeervice
      .getMunicipiosByDepartamento()
      .subscribe((data: MunicipioInfo[]) => {
        this.municipios = data.map((m: MunicipioInfo) => m?.municipio || '');
        this.municipios = this.municipios.sort();

        this.municipios.unshift(' -- Seleccione un Municipio --');
      
      });
  }

  ngOnRegisterBasic(form: NgForm) {
    console.log(form);
    if (form.invalid) {
      console.log('Formulario no valiido');
      return;
    }

    if (!form.pristine && form.valid) {
      
      Swal.fire({
        icon:'info',       
        text: 'Espere por favor',
        allowOutsideClick:false,
      });

      Swal.showLoading();
      this.auth.createUserWithEmail(this.user)
      .subscribe(
        (res) => {
          //: SingUpOK
          console.log(res);
          Swal.close()
          this.router.navigate(['/home']);
        },
        (err) => {
          // SingUpError
          Swal.fire({
            icon:'error',       
            text: err.error.error.message,
          })
        }
      ); 
    }
  }
}


