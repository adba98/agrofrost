import { TitleCasePipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";
import { Cultivo } from '../models/RestAgricultureResponse.interace';


@Pipe({
    name: 'cultivoPipe'
})
export class CultivoPipe implements PipeTransform {

    public constructor(
        private titlePipe: TitleCasePipe
    ) {


    }
    transform(value: Cultivo) {
        console.log(value);
        console.log(typeof (value));

        if (value == null) {
            return '';
        } else {

            const nombre = this.titlePipe.transform(value.desagregaci_n_regional_y);
            const opcional = this.titlePipe.transform((value.cultivo == value.desagregaci_n_regional_y) ? '' : ` (${value.cultivo})`);

            const grupo = (this.titlePipe.transform(value.grupo_de_cultivo) || '').replace(' Y ', ' y ');
            return ` ${nombre}${opcional} - ${grupo}`
        }
    }

}