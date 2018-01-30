import {Component, OnChanges, OnDestroy, Input} from '@angular/core';
import {MonitoringService} from './shared/monitoring.service';
import {Car} from '../../shared/models/car.model';
import {Monitoring} from './shared/monitoring.model';
import {Subscription} from 'rxjs/Subscription';
import {TimerObservable} from 'rxjs/observable/TimerObservable';

@Component({
    selector   : 'app-monitoring',
    templateUrl: 'monitoring.component.html',
    styleUrls  : ['monitoring.component.css']
})
export class MonitoringComponent implements OnChanges, OnDestroy {
    @Input() car: Car;
    public status: Monitoring;
    public detailsError = false;
    public reasons: any[];
    public solutions: any[];
    private subscription: Subscription = new Subscription();
    private timer                      = TimerObservable.create(0, 5000);

    constructor(private monitoringService: MonitoringService) {
    }

    ngOnChanges(event: any) {
        if (event.car && event.car.currentValue !== undefined) {

            if (this.subscription) {
                this.subscription.unsubscribe();
            }

            this.subscription = this.timer.subscribe(() => {
                this.monitoringService.status(this.car).subscribe(
                    data => {
                        this.status = data;
                    }
                );
            });
        }
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    showError(id: string): any[] {
        if (!this.status.issue_locations.hasOwnProperty(id)) {
            return [];
        }

        const errors = [];
        const codes = [];

        this.status.issue_locations[id].forEach(code => {
            codes.push(code);
        });

        this.status.issues.forEach(issue => {
            const key = codes.indexOf(issue.id);
            if (key !== -1) {
                errors.push({id: issue.id, name: issue.name, key: key});
            }
        });

        return errors;
    }

    showDetailsError(error_id) {
        console.log(error_id);
        this.reasons = this.status.issues[error_id].reasons;
        this.solutions = this.status.issues[error_id].solutions;
        this.detailsError = true;
    }
}
