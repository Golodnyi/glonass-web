import { Pipe, PipeTransform } from '@angular/core';
import { isUndefined } from 'util';
import { TranslateService } from '@ngx-translate/core';

@Pipe({ name: 'chartTranslate' })
export class ChartTranslatePipe implements PipeTransform {
    constructor(private translateService: TranslateService) { }
    transform(items: any): any {
        items.data.forEach(item => {
            item.name = this.translateService.instant(item.name);
            item.unit = this.translateService.instant(item.unit);
        });

        return items;
    }
}
