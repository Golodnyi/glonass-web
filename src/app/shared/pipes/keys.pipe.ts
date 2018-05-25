import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
    transform(data: any, reverse = true): any {
        if (reverse) {
            return Object.keys(data).reverse();
        }

        return Object.keys(data);
    }
}
