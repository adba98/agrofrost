import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

export interface MunicipioInfo {
  departamento?: string;
  municipio?: string;
}

@Injectable({
  providedIn: 'root',
})
export class DepatamentosYmunicipiosService {
  private url = 'https://www.datos.gov.co/resource/xdk5-pm3f.json';
  // private url ='https://restcountries.eu/rest/v2/lang/es'

  constructor(private http: HttpClient) {
    console.log('Servicio paises inciado');
  }

  getDepartementos() {
    return this.http.get<MunicipioInfo[]>(this.url).pipe(
      map((respuesta: MunicipioInfo[]) => {
        return respuesta.map((d: MunicipioInfo) => {
          return {
            departamento: d.departamento,
            municipio: d.municipio,
          };
        });
      })
    );
  }
  getMunicipiosByDepartamento() {
    return this.http
      .get<MunicipioInfo[]>(`${this.url}?departamento=Cundinamarca`)
      .pipe(
        map((respuesta: MunicipioInfo[]) => {
          return respuesta.map((d: MunicipioInfo) => {
            return {
              municipio: d.municipio,
            };
          });
        })
      );
  }
}
