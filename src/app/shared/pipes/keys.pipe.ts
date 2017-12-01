import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(data: any): any {
    return Object.keys(data).reverse();
  }
}
