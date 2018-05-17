import { Pipe, PipeTransform } from '@angular/core';
import { isUndefined } from 'util';
import { TranslateService } from '@ngx-translate/core';

@Pipe({ name: 'DropDown' })
export class DropDownPipe implements PipeTransform {
    constructor(private translateService: TranslateService) { }
    transform(data: any[], defaultValue = true, translate = false): any[] {
        const items = [];

        if (defaultValue) {
            this.translateService.get('dashboard.notSelected').subscribe(value => {
                items.push({ label: value, value: null });
            });
        }
        if (isUndefined(data)) {
            return items;
        }

        data.forEach(item => {
            if (translate) {
                this.translateService.get(item.name).subscribe(value => {
                    items.push(
                        {
                            'label': value,
                            'value': item.id
                        }
                    );
                });
            } else {
                items.push(
                    {
                        'label': item.name,
                        'value': item.id
                    }
                );
            }

 
        });
        return items;
    }
}
