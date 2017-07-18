import { Component, Input, OnChanges } from '@angular/core';
import { State } from './shared/state.model';
import * as moment from 'moment';
import { Calendar } from '../../shared/models/calendar.model';
import { FormGroup } from '@angular/forms';
import { ResetForm } from './shared/reset.form';
import { ResetService } from './shared/reset.service';
import { MsgService } from '../../shared/services/msg';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css'],
  providers: [ResetForm, ResetService]
})
export class StateComponent implements OnChanges {
  @Input() state: State;
  @Input() title: string;
  @Input() toggleable = true;
  @Input() compact = false;
  public ru = new Calendar();
  private audio = new Audio();
  public display = false;
  public form: FormGroup;
  public submit: boolean;
  private resetData: any;
  constructor(private resetForm: ResetForm, private resetService: ResetService, private msg: MsgService) {
    this.form = this.resetForm.create();
    this.form.valueChanges
      .map((value) => {
        value.date = moment(value.date).format('YYYY-MM-DD');
        return value;
      })
      .subscribe((data) => {
        this.submit = false;
        this.resetData = data;
      });
    this.audio.src = '/assets/signal.mp3';
    this.audio.load();
  }

  ngOnChanges() {
    if (this.state && this.state.issues.length) {
      // this.audio.play();
    }
  }

  public online() {
    return (Number(moment().format('X')) - Number(this.state.timestamp) / 1000) < 3600;
  }

  public showDialog() {
    this.display = true;
  }

  public onSubmit() {
    this.submit = true;
    this.resetService.reset(this.resetData).subscribe(
      data => {
        console.log(data);
      },
      error => {
        this.submit = false;
        this.msg.notice(MsgService.ERROR, 'Ошибка', error);
      }
    );
  }
}
