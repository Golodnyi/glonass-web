import { Pipe, PipeTransform } from '@angular/core';
import { isUndefined } from 'util';

@Pipe({name: 'DropDown'})
export class DropDownPipe implements PipeTransform {
    transform(data: any[], defaultValue = true): any[] {
        const items = [];

        if (defaultValue) {
            items.push({label: 'Не выбрано', value: null});
        }
        if (isUndefined(data)) {
            return items;
        }
        data.forEach(item => {
            items.push(
                {
                    'label': item.name,
                    'value': item.id
                }
            );
        });
        return items;
    }
}
