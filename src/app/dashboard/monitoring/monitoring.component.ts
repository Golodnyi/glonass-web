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
    private audio = new Audio();
    private subscription: Subscription = new Subscription();
    private timer                      = TimerObservable.create(0, 5000);

    constructor(private monitoringService: MonitoringService) {
        this.audio.src = '/assets/signal.wav';
        this.audio.load();
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
        this.audio.pause();
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

        if (errors.length && !this.isMuted() && this.audio.paused) {
            this.audio.play();
        }

        return errors;
    }

    public isMuted() {
        return !(localStorage.getItem('mute_monitoring') === null);
    }

    public unMute() {
        if (localStorage.getItem('mute_monitoring') !== null) {
            localStorage.removeItem('mute_monitoring');
        }
    }

    public mute() {
        if (localStorage.getItem('mute_monitoring') === null) {
            localStorage.setItem('mute_monitoring', '1');
            this.audio.pause();
        }
    }

    showDetailsError(error_id) {
        this.reasons = this.status.issues[error_id].reasons;
        this.solutions = this.status.issues[error_id].solutions;
        this.detailsError = true;
    }
}
