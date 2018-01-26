import {Pipe, PipeTransform} from '@angular/core';
import {isArray} from 'util';

@Pipe({name: 'table'})
export class TablePipe implements PipeTransform {
    transform(data: any): any {
        const temp = [];
        data.forEach(option => {
            option.data.forEach(d => {
                if (!isArray(temp[d[0]])) {
                    temp[d[0]] = [];
                }
                temp[d[0]][option.id] = d[1];
            });
        });
        return temp;
    }
}
