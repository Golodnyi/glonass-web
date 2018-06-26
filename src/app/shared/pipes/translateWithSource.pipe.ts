import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({ name: 'TranslateWithSource' })
export class TranslateWithSource implements PipeTransform {
    constructor(private translateService: TranslateService) { }
    transform(sources: any): any {
        if (sources === undefined) {
            return {};
        }

        const keys = Object.keys(sources);
        const result = {};

        keys.forEach(key => {
            result[key] = this.translateService.instant(sources[key]);
        });

        return result;
    }
}
