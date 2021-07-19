import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import {
  DepatamentosYmunicipiosService,
  MunicipioInfo,
} from 'src/app/services/depatamentos-ymunicipios.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss'],
})
export class SingupComponent implements OnInit {
  public user: User;
  municipios: string[] = [];

  constructor(private dmSeervice: DepatamentosYmunicipiosService) {
    this.user = new User();
  }

  ngOnInit(): void {
    this.dmSeervice
      .getMunicipiosByDepartamento()
      .subscribe((data: MunicipioInfo[]) => {
        console.log(data);
        this.municipios = data.map((m: MunicipioInfo) => m?.municipio || '');
        this.municipios = this.municipios.sort();

        this.municipios.unshift(' -- Seleccione un Municipio --');
        console.log(this.municipios);
      });
  }

  ngOnRegisterBasic(form: NgForm) {
    if (form.invalid) {
      return;
    }

    if (form.pristine && form.valid) {
      console.log('Formulario valiido');
      console.log(this.user);
    }
  }
}
function data(
  data: any,
  arg1: any,
  arg2: { console: Console; '': any; this: any }
) {
  throw new Error('Function not implemented.');
}
