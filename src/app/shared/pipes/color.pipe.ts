import { Pipe, PipeTransform } from '@angular/core';
import { isArray } from 'util';

@Pipe({name: 'color'})
export class ColorPipe implements PipeTransform {
  transform(plot: any, value: any): any {
    if (plot === undefined) {
      return '';
    }
    plot.forEach(p => {
      if (p.from >= value && p.to <= value) {
        return p.color;
      }
    });

    return '';
  }
}
