import {Component, OnChanges, OnDestroy, Input} from '@angular/core';
import {Car} from '../../shared/models/car.model';

@Component({
    selector   : 'app-monitoring',
    templateUrl: 'monitoring.component.html',
    styleUrls  : ['monitoring.component.css'],
})
export class MonitoringComponent implements OnChanges, OnDestroy {
    @Input() car: Car;

    constructor() {
    }

    ngOnChanges() {
    }

    ngOnDestroy() {
    }
}
