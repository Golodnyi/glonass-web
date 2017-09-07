import {Component, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {StateService} from './shared/state.service';
import {State} from './shared/state.model';

@Component({
    selector: 'app-monitoring',
    templateUrl: './monitoring.component.html',
    styleUrls: ['./monitoring.component.css'],
    providers: [StateService]
})
export class MonitoringComponent implements OnDestroy {
    private timer = Observable.timer(0, 5000);
    private timerWarning = Observable.timer(0, 5000);
    private subscriptionTimer: Subscription;
    private subscriptionWarningTimer: Subscription;
    public state: State;
    public stateWarnings: State;
    constructor(private stateService: StateService) {
        this.update();
        this.updateWarnings();
    }

    private update() {
        if (this.subscriptionTimer) {
            this.subscriptionTimer.unsubscribe();
        }
        this.subscriptionTimer =
            this.timer.subscribe(
                () => {
                    this.stateService.getMonitor(false).subscribe(
                        data => {
                            this.state = data;
                        }
                    );
                }
            );
    }

    private updateWarnings() {
        if (this.subscriptionWarningTimer) {
            this.subscriptionWarningTimer.unsubscribe();
        }
        this.subscriptionWarningTimer =
            this.timerWarning.subscribe(
                () => {
                    this.stateService.getMonitor(true).subscribe(
                        data => {
                            this.stateWarnings = data;
                        }
                    );
                }
            );
    }

    ngOnDestroy() {
        if (this.subscriptionTimer) {
            this.subscriptionTimer.unsubscribe();
        }
        if (this.subscriptionWarningTimer) {
            this.subscriptionWarningTimer.unsubscribe();
        }
    }
}
