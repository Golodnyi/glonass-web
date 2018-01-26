import {Component, Input, OnChanges, OnDestroy} from '@angular/core';
import {State} from './shared/state.model';
import * as moment from 'moment';
import {ResetForm} from './shared/reset.form';
import {ResetService} from './shared/reset.service';
import {Car} from '../../shared/models/car.model';
import {AuthService} from '../../shared/services/auth.service';
import {User} from '../../shared/models/user.model';

@Component({
    selector   : 'app-monitoring',
    templateUrl: 'monitoring.component.html',
    styleUrls  : ['monitoring.component.css'],
})
export class MonitoringComponent implements OnChanges, OnDestroy {
    @Input() state: State;
    @Input() car: Car;
    @Input() toggleable = true;
    @Input() compact    = false;
    private audio       = new Audio();
    public user: User;

    constructor(private authService: AuthService) {
        moment.locale('ru');
        this.audio.src = '/assets/signal.wav';
        this.audio.load();
        this.user = this.authService.getCurrentUser();
    }

    ngOnChanges() {
        if (this.state && this.state.issues.length) {
            this.state.issues.forEach(issue => {
                if (!StateComponent.isMuted(issue.id)) {
                    this.audio.play();
                }
            });
        }
    }

    public unMute(id) {
        if (localStorage.getItem('mute_' + id) !== null) {
            localStorage.removeItem('mute_' + id);
        }
    };

    public isMuted(id) {
        return !(localStorage.getItem('mute_' + id) === null);
    };

    public online(state: State) {
        return (Number(moment().format('X')) - Number(state.timestamp) / 1000) < 3600;
    };

    public mute(id) {
        if (localStorage.getItem('mute_' + id) === null) {
            localStorage.setItem('mute_' + id, id);
            this.audio.pause();
        }
    }

    ngOnDestroy() {
        this.audio.pause();
    }
}
