import { Pipe, PipeTransform } from '@angular/core';
import { Color } from '../models/color';

@Pipe({
  name: 'colorFilterPipe'
})
export class ColorFilterPipePipe implements PipeTransform {

  transform(value: Color[], colorFilterText:string): Color[] {
    colorFilterText=colorFilterText?colorFilterText.toLocaleLowerCase():""
    return colorFilterText?value
    .filter((p:Color)=>p.colorName.toLocaleLowerCase().indexOf(colorFilterText)!==-1)
    :value;
  }

}
