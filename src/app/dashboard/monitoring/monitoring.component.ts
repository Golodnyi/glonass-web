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
    public reasons: any[]   = [];
    public forecasts: any[] = [];
    public minDuration: number;
    public maxDuration: number;
    public duration: number;
    public greenWidth: number;
    public orangeWidth: number;
    public redWidth: number;
    public errorIcon = false;
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
                        if (this.status.issues.length) {
                            this.errorIcon = true;
                        } else {
                            this.errorIcon = false;
                        }
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

    public showDetailsError(error_id) {
        this.forecasts    = this.status.issues[error_id].forecast;
        this.reasons      = this.status.issues[error_id].reasons;
        this.minDuration  = this.status.issues[error_id].minDuration;
        this.maxDuration  = this.status.issues[error_id].maxDuration;
        this.duration     = this.status.issues[error_id].duration;
        this.greenWidth   = this.greenProgressWidth();
        this.orangeWidth  = this.orangeProgressWidth();
        this.redWidth     = this.redProgressWidth();
        this.detailsError = true;
    }

    public greenProgressWidth(): number {
        let progress = this.duration / this.minDuration * 100;
        if (progress > 100) {
            progress = 100;
        }

        const result = (this.minDuration / this.maxDuration * 100 || 0) * progress / 100;

        return result;
    }

    public orangeProgressWidth(): number {
        let progress = this.duration / this.minDuration * 100;
        if (progress < 100) {
            return 0;
        }

        progress = this.duration / this.maxDuration * 100;

        if (progress > 100) {
            progress = 100;
        }

        const result = (80 - this.greenProgressWidth() || 0) * progress / 100;

        return result;
    }

    public redProgressWidth(): number {
        let progress = (this.duration / this.maxDuration * 100);

        if (progress < 100) {
            return 0;
        } else if (progress > 200) {
            progress = 200;
        }

        const result = 20 * (progress - 100) / 100;

        return result;
    }
}
