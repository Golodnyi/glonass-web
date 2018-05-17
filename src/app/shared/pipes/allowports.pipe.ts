import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({name: 'AllowPorts'})
export class AllowPortsPipe implements PipeTransform {
    transform(ports: any[], allowPorts: any[]): any[] {
        return ports.filter(port => {
            port.name = this.translateService.instant(port.name);
            return allowPorts.indexOf(port.value) !== -1;
        });
    }

    constructor(private translateService: TranslateService) { }
}
