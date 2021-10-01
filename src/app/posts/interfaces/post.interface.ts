import { Cultivo } from '../../models/RestAgricultureResponse.interace';
export interface Post {
    id?: string
    tipo_post: string;
    fecha_post: Date;

    cultivo_info: Cultivo;

    cantidad: number;
    precio: number;
    descripcion: string;
    imgs: string[];
       
    caracteristicas: Caracteristicas; 
   
    ubicacion: Ubicacion;
    post_owner: UserInfo;

    publicitado?: boolean;
}

export interface Caracteristicas{

    transporte: boolean;
    organico: boolean;
    exportacion:boolean;
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