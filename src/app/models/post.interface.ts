import { Cultivo } from './RestAgricultureResponse.interace';
export interface Post {
    id?: string
    tipo_post: string;
    
    cultivo: Cultivo;

    cantidad: number;
    precio: number;
    descripcion: string;
    imgs: string[];
       
    transporte: string;
    organico: string;
   
    ubicacion: Ubicacion;
    post_owner: UserInfo;
}

export interface GeoCode {
    lat: number;
    lng: number;
}

export interface Ubicacion {
    departamento: string;
    municipio: string;
    direccion: string;
    geolocalizacion: GeoCode;
}

export interface UserInfo {
    id?: string;
    correo: string;
    celular: number;
    nombre: string;
}