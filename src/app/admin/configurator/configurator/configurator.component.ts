import {Component} from '@angular/core';

@Component({
    selector   : 'app-configurator',
    templateUrl: './configurator.component.html',
    styleUrls  : ['./configurator.component.css']
})
export class ConfiguratorComponent {
    public car: number;

    constructor() {
    }

    public carUpdate(car: number) {
        this.car = car;
    }
}
