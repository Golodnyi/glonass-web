import {Component, Input, OnChanges, OnDestroy} from '@angular/core';
import {State} from './shared/state.model';
import * as moment from 'moment';
import {Calendar} from '../../shared/models/calendar.model';
import {FormGroup} from '@angular/forms';
import {ResetForm} from './shared/reset.form';
import {ResetService} from './shared/reset.service';
import {MsgService} from '../../shared/services/msg';
import {Car} from '../../shared/models/car.model';
import {AuthService} from '../../shared/services/auth.service';
import {User} from '../../shared/models/user.model';
import { MotochasFilterForm } from './shared/motochasFilter.form';
import { MotochasService } from './shared/motochas.service';
import { MotochasFilter } from './shared/motochasFilter.model';
import { Error } from '../../shared/models/error.model';
import { Router } from '@angular/router';

@Component({
    selector   : 'app-state',
    templateUrl: './state.component.html',
    styleUrls  : ['./state.component.css'],
    providers  : [ResetForm, ResetService, MotochasFilterForm, MotochasService]
})
export class StateComponent implements OnChanges, OnDestroy {
    @Input() state: State;
    @Input() car: Car;
    @Input() toggleable           = true;
    @Input() compact              = false;
    public ru                     = new Calendar();
    public display                = false;
    public displayGaranted        = false;
    public displayHistory         = false;
    public displayGarantedHistory = false;
    public form: FormGroup;
    public formMotochasFilter: FormGroup;
    public submit: boolean;
    public submitMotochasFilter: boolean;
    public history                = [];
    public garantedHistory        = [];
    public user: User;
    private audio                 = new Audio();
    private resetData: any;
    public motochasFilter         = false
    private motochasFilterVal     = 0;
    public motochasFilterAnswer: MotochasFilter;
    public static unMute(id) {
        if (localStorage.getItem('mute_' + id) !== null) {
            localStorage.removeItem('mute_' + id);
        }
    };

    public static isMuted(id) {
        return !(localStorage.getItem('mute_' + id) === null);
    };

    public static online(state: State) {
        return (Number(moment().format('X')) - Number(state.timestamp) / 1000) < 3600;
    };

    public static garanted(state: State): boolean {
        return (state.maintenances.capital.limits.hours - state.maintenances.capital.value.hours > 0) &&
            (state.maintenances.capital.limits.days - state.maintenances.capital.value.days > 0);
    };

    public static scheduled(state: State): boolean {
        return state.maintenances.scheduled.limits.hours - state.maintenances.scheduled.value.hours > 0;
    };

    /**
     * TODO: раскидать все всплывающие окна по отдельным компонентам
     */
    constructor(
        private resetForm: ResetForm,
        private motochasFilterForm: MotochasFilterForm,
        private resetService: ResetService,
        private motochasService: MotochasService,
        private msg: MsgService,
        private authService: AuthService,
        private router: Router) {
        moment.locale('ru');
        this.form = this.resetForm.create();
        this.form.valueChanges
            .map((value) => {
                value.created_at = moment(value.created_at).format();
                return value;
            })
            .subscribe((data) => {
                this.submit              = false;
                this.resetData           = data;
                this.resetData.engine_id = this.car.engine.id;
            });

        this.formMotochasFilter = this.motochasFilterForm.create();
        this.formMotochasFilter.valueChanges
            .subscribe((data) => {
                this.motochasFilterVal = data.motochas;
            });

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

    public isMuted(id: number): boolean {
        return StateComponent.isMuted(id);
    }

    public unMute(id: number) {
        StateComponent.unMute(id);
    }

    public garanted(state: State): boolean {
        return StateComponent.garanted(state);
    }

    public scheduled(state: State): boolean {
        return StateComponent.scheduled(state);
    }

    public online(state: State) {
        return StateComponent.online(state);
    }

    public mute(id) {
        if (localStorage.getItem('mute_' + id) === null) {
            localStorage.setItem('mute_' + id, id);
            this.audio.pause();
        }
    }

    public showTODialog() {
        this.display = true;
    }

    public showGarantedDialog() {
        this.displayGaranted = true;
    }

    public onSubmitGaranted() {
        this.submit = true;
        this.resetService.resetGaranted(this.resetData).subscribe(
            () => {
                this.msg.notice(MsgService.SUCCESS, 'Гарантийное обслуживание', 'продлено');
                this.displayGaranted = false;
            },
            error => {
                this.submit = false;
                Error.check(error, this.router, this.msg);
            }
        );
    }

    public onSubmitTO() {
        this.submit = true;
        this.resetService.reset(this.resetData).subscribe(
            () => {
                this.msg.notice(MsgService.SUCCESS, 'Техническое обслуживание', 'проведено');
                this.display = false;
            },
            error => {
                this.submit = false;
                Error.check(error, this.router, this.msg);                
            }
        );
    }

    public showTOHistory() {
        this.resetService.all(this.car).subscribe(
            data => {
                this.history = [];
                data.forEach(d => {
                    this.history.push(d);
                });
                this.displayHistory = true;
            },
            error => {
                Error.check(error, this.router, this.msg);
            }
        );
    }

    ngOnDestroy() {
        this.audio.pause();
    }

    public showGarantedHistory() {
        this.resetService.allGaranted(this.car).subscribe(
            data => {
                this.garantedHistory = [];
                data.forEach(d => {
                    this.garantedHistory.push(d);
                });
                this.displayGarantedHistory = true;
            },
            error => {
                Error.check(error, this.router, this.msg);
            }
        );
    }

    public showMotochasFilter() {
        this.motochasFilter = true;
    }

    public onSubmitMotochasFilter() {
        this.submitMotochasFilter = true;
        this.motochasService.get(this.car, this.motochasFilterVal).subscribe(
            response => {
                this.motochasFilterAnswer = response;
                this.submitMotochasFilter = false;
            }
        );
    }
}
