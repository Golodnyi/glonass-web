import {Component, Input, OnChanges} from '@angular/core';
import {State} from './shared/state.model';
import * as moment from 'moment';
import {Calendar} from '../../shared/models/calendar.model';
import {FormGroup} from '@angular/forms';
import {ResetForm} from './shared/reset.form';
import {ResetService} from './shared/reset.service';
import {MsgService} from '../../shared/services/msg';
import {Car} from '../../shared/models/car.model';

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
  public displayHistory = false;
  public form: FormGroup;
  public submit: boolean;
  public history = [];
  private audio = new Audio();
  private resetData: any;

  constructor(private resetForm: ResetForm, private resetService: ResetService, private msg: MsgService) {
    moment.locale('ru');
    this.form = this.resetForm.create();
    this.form.valueChanges
      .map((value) => {
        value.date = moment(value.date).format();
        return value;
      })
      .subscribe((data) => {
        this.submit = false;
        this.resetData = data;
        this.resetData.engine_id = this.car.engine.id;
      });
    this.audio.src = '/assets/signal.wav';
    this.audio.load();
    console.log('Last state init');
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

  public showDialog() {
    this.display = true;
  }

  public onSubmit() {
    this.submit = true;
    this.resetService.reset(this.resetData).subscribe(
      () => {
        this.msg.notice(MsgService.SUCCESS, 'Сброс', 'Моточасы сброшены');
        this.display = false;
      },
      error => {
        this.submit = false;
        this.msg.notice(MsgService.ERROR, 'Ошибка', error);
      }
    );
  }

  public showHistory() {
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
}
