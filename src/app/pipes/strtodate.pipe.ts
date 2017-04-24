import {Pipe, PipeTransform} from '@angular/core';
import {isUndefined} from 'util';
import * as moment from 'moment';

@Pipe({name: 'strtodate'})
export class StrToDatePipe implements PipeTransform {
  transform(date: string): Date {
    if (isUndefined(date)) {
      return null;
    }

    return moment(date).toDate();
  }
}
