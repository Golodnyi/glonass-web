import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'AllowPorts'})
export class AllowPortsPipe implements PipeTransform {
    transform(ports: any[], allowPorts: any[]): any[] {
        return ports.filter(port => {
            return allowPorts.indexOf(port.value) !== -1;
        });
    }
}
