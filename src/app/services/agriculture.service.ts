import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import {
  Cultivo,
  RestAgriculturesResponse,
} from '../components/models/RestAgricultureResponse.interace';
import { Observable, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AgricultureService {
  private readonly url = 'https://www.datos.gov.co/resource/2pnw-mmge.json';
  private readonly app_token = environment.datosAbiertosGovco.appTtoken;
  private readonly apiKey = `$$app_token=${this.app_token}`;

  constructor(private http: HttpClient) {}

  get getParams() {
    return new HttpParams().set('$$app_token', this.app_token);
  }

  getDataAgricultura(): Observable<RestAgriculturesResponse[]> {
    return this.http.get<RestAgriculturesResponse[]>(this.url, {
      params: this.getParams,
    });
  }

  getCultivos(): Observable<Cultivo[]> {
    const query =
      'SELECT DISTINCT  grupo_de_cultivo, subgrupo_de_cultivo, cultivo, desagregaci_n_regional_y  ORDER BY desagregaci_n_regional_y limit 90000`';
    return this.http.get<RestAgriculturesResponse[]>(this.url, {
      params: this.getParams.set('$query', query),
    });
  }
  getCultivosByTerm(term: string): Observable<Cultivo[]> {
    const query = `SELECT DISTINCT  grupo_de_cultivo, subgrupo_de_cultivo, cultivo, desagregaci_n_regional_y  where cultivo like upper('${term}%25') ORDER BY desagregaci_n_regional_y limit 90000`;
    const urlf=  `${this.url}?${this.apiKey}&&$query=SELECT DISTINCT  grupo_de_cultivo, subgrupo_de_cultivo, cultivo, desagregaci_n_regional_y  where cultivo like upper('${term}%25') ORDER BY desagregaci_n_regional_y limit 90000`;
    return this.http.get<RestAgriculturesResponse[]>(urlf);
  }
  // `${this.url}?${this.apiKey}&&$query=SELECT DISTINCT  grupo_de_cultivo, subgrupo_de_cultivo, cultivo,desagregaci_n_regional_y, producci_n_t , nombre_cientifico  limit 90000`
}
