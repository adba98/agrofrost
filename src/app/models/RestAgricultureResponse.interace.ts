// https://www.datos.gov.co/resource/2pnw-mmge.json?$$app_token=5lXvVAUcBJ5ovX7n4ZsGqBreY
export interface   RestAgriculturesResponse {
    c_d_dep:                  string;
    departamento:             string;
    c_d_mun:                  string;
    municipio:                string;
    grupo_de_cultivo:         string;
    subgrupo_de_cultivo:      string;
    cultivo:                  string;
    desagregaci_n_regional_y: string;
    a_o:                      string;
    periodo:                  string;
    rea_sembrada_ha:          string;
    rea_cosechada_ha:         string;
    producci_n_t:             string;
    rendimiento_t_ha:         string;
    estado_fisico_produccion: string;
    nombre_cientifico:        string;
    ciclo_de_cultivo:         string;
}

export interface   Cultivo {
    grupo_de_cultivo:         string;
    subgrupo_de_cultivo:      string;
    cultivo:                  string;
    desagregaci_n_regional_y: string;
    nombre_cientifico:        string;
}
