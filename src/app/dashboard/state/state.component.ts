import {Component, Input, OnChanges} from '@angular/core';
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

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css'],
  providers: [ResetForm, ResetService]
})
export class StateComponent implements OnChanges {
  @Input() state: State;
  @Input() car: Car;
  @Input() toggleable = true;
  @Input() compact = false;
  public ru = new Calendar();
  public display = false;
  public displayGaranted = false;
  public displayHistory = false;
  public displayGarantedHistory = false;
  public form: FormGroup;
  public submit: boolean;
  public history = [];
  public garantedHistory = [];
  private audio = new Audio();
  private resetData: any;
  public user: User;
  constructor(private resetForm: ResetForm, private resetService: ResetService, private msg: MsgService, private authService: AuthService) {
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
    this.authService.getCurrentUser().subscribe(user => {
      this.user = user;
    });
  }

  ngOnChanges() {
    if (this.state && this.state.issues.length) {
      this.state.issues.forEach(issue => {
        if (!this.isMuted(issue.id)) {
          this.audio.play();
        }
      });
    }
  }

  public maintenanceDate(): number {
    if (this.state) {
      const dateReset = moment(this.state.maintenance_date);
      const dateNow = moment();

      return dateNow.diff(dateReset, 'days');
    }

    return 0;
  }

  public online() {
    return (Number(moment().format('X')) - Number(this.state.timestamp) / 1000) < 3600;
  }

  public mute(id) {
    if (localStorage.getItem('mute_' + id) === null) {
      localStorage.setItem('mute_' + id, id);
      this.audio.pause();
    }
  }

  public unMute(id) {
    if (localStorage.getItem('mute_' + id) !== null) {
      localStorage.removeItem('mute_' + id);
    }
  }

  public isMuted(id) {
    return !(localStorage.getItem('mute_' + id) === null);
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
        this.msg.notice(MsgService.ERROR, 'Ошибка', error);
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
        this.msg.notice(MsgService.ERROR, 'Ошибка', error);
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
        this.msg.notice(MsgService.ERROR, 'Ошибка', error);
      }
    );
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
        this.msg.notice(MsgService.ERROR, 'Ошибка', error);
      }
    );
  }

  public garanted(state: State): boolean {
    return (state.maintenances.capital.limits.hours - state.maintenances.capital.value.hours > 0) &&
      (state.maintenances.capital.limits.days - state.maintenances.capital.value.days > 0);
  }

  public scheduled(state: State): boolean {
    return state.maintenances.scheduled.limits.hours - state.maintenances.scheduled.value.hours > 0;
  }
}
