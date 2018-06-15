import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Car } from '../../../../shared/models/car.model';
import { ResetService } from '../../shared/reset.service';
import { ResetForm } from '../../shared/reset.form';
import { MsgService } from '../../../../shared/services/msg';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css'],
})
export class MaintenanceComponent {
  @Input() car: Car;
  @Input() visible: boolean;
  @Output() hide = new EventEmitter();
  public form: FormGroup;
  public submit: boolean;
  private data: any;

  constructor(
    private resetService: ResetService,
    private resetForm: ResetForm,
    private msg: MsgService,
    private translateService: TranslateService) {
    this.form = this.resetForm.create();
    this.form.valueChanges
      .map((value) => {
        value.created_at = moment(value.created_at).format();
        return value;
      })
      .subscribe((data) => {
        this.submit = false;
        this.data = data;
        this.data.engine_id = this.car.engine.id;
      });
  }

  public onSubmit() {
    this.submit = true;
    this.resetService.reset(this.data).subscribe(
      () => {
        this.msg.notice(
          MsgService.SUCCESS,
          this.translateService.instant('dashboard.maintenance'),
          this.translateService.instant('dashboard.carriedOut')
        );
        this.submit = false;
      },
      () => {
        this.submit = false;
      }
    );
  }

  public onHide() {
    this.hide.emit(true);
  }

  public onShow() {
    this.hide.emit(false);
  }
}
