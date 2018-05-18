import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { State } from './shared/state.model';
import * as moment from 'moment';
import { Calendar } from '../../shared/models/calendar.model';
import { FormGroup } from '@angular/forms';
import { ResetForm } from './shared/reset.form';
import { ResetService } from './shared/reset.service';
import { MsgService } from '../../shared/services/msg';
import { Car } from '../../shared/models/car.model';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/user.model';

@Component({
    selector: 'app-state',
    templateUrl: './state.component.html',
    styleUrls: ['./state.component.css'],
    providers: [ResetForm, ResetService]
})
export class StateComponent implements OnChanges, OnDestroy {
    @Input() state: State;
    @Input() car: Car;
    @Input() toggleable = true;
    @Input() compact = false;
    public ru = new Calendar();
    public display = false;
    public displayGaranted = false;
    public displayMaintenanceHistory = false;
    public displayGarantedHistory = false;
    public form: FormGroup;
    public submit: boolean;
    public history = [];
    public garantedHistory = [];
    public user: User;
    private audio = new Audio();
    private resetData: any;
    public displayMotochasFilter = false

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
    constructor(private resetForm: ResetForm,
        private resetService: ResetService,
        private msg: MsgService,
        private authService: AuthService) {
        moment.locale('ru');
        this.form = this.resetForm.create();
        this.form.valueChanges
            .map((value) => {
                value.created_at = moment(value.created_at).format();
                return value;
            })
            .subscribe((data) => {
                this.submit = false;
                this.resetData = data;
                this.resetData.engine_id = this.car.engine.id;
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

    public showMaintenanceDialog() {
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
            () => {
                this.submit = false;
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
            () => {
                this.submit = false;
            }
        );
    }

    ngOnDestroy() {
        this.audio.pause();
    }

    public showMotochasFilter() {
        this.displayMotochasFilter = true;
    }

    public motochasFilterHide(hide: boolean) {
        if (hide) {
            this.displayMotochasFilter = false;
        }
    }

    public maintenanceHistoryHide(hide: boolean) {
        if (hide) {
            this.displayMaintenanceHistory = false;
        }
    }

    public garantedHistoryHide(hide: boolean) {
        if (hide) {
            this.displayGarantedHistory = false;
        }
    }

    public showGarantedHistory() {
        this.displayGarantedHistory = true;
    }

    public showMaintenanceHistory() {
        this.displayMaintenanceHistory = true;
    }
}
