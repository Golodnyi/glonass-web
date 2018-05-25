import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { StateService } from './shared/state.service';
import { State } from './shared/state.model';
import { TimerObservable } from 'rxjs/observable/TimerObservable';

@Component({
    selector   : 'app-monitoring',
    templateUrl: './monitoring.component.html',
    styleUrls  : ['./monitoring.component.css'],
    providers  : [StateService]
})
export class MonitoringComponent implements OnDestroy {
    public state: State[] = [];
    private timer         = TimerObservable.create(0, 5000);
    private subscriptionTimer: Subscription;
    private audio         = new Audio();
    public showCommentsModal: boolean;
    public car: number;

    constructor(private stateService: StateService) {
        this.audio.src = '/assets/monitoring.wav';
        this.audio.load();
        this.subscriptionTimer =
            this.timer.subscribe(
                () => {
                    this.stateService.getMonitor(false).subscribe(
                        data => {
                            this.state = data;
                            this.sound(data);
                        }
                    );
                }
            );
    }

    ngOnDestroy() {
        this.audio.pause();
        if (this.subscriptionTimer) {
            this.subscriptionTimer.unsubscribe();
        }
    }

    private sound(data: any) {
        data.forEach(item => {
            if (item.issues && item.issues.length && this.audio.paused) {
                this.audio.play();
            }
        });
    }

    public showComments(s: State) {
        this.showCommentsModal = true;
        this.car               = s.id;
    }

    public hideComments() {
        this.showCommentsModal = false;
    }
}
