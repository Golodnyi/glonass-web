import {Pipe, PipeTransform} from '@angular/core';
import {isUndefined} from 'util';

@Pipe({name: 'DropDown'})
export class DropDownPipe implements PipeTransform {
  transform(data: any[]): any[] {
    const items = [];
    if (isUndefined(data)) {
      return items;
    }

    data.forEach(function (item) {
      items.push(
        {
          'label': item.name,
          'value': item.id,
        }
      );
    });
    return items;
  }
}
