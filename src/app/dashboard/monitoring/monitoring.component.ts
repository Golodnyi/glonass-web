import {Component, OnChanges, OnDestroy} from '@angular/core';
import * as moment from 'moment';
import {AuthService} from '../../shared/services/auth.service';
import {User} from '../../shared/models/user.model';

@Component({
    selector   : 'app-monitoring',
    templateUrl: 'monitoring.component.html',
    styleUrls  : ['monitoring.component.css'],
})
export class MonitoringComponent implements OnChanges, OnDestroy {

    constructor() {
    }

    ngOnChanges() {
    }

    ngOnDestroy() {
    }
}
