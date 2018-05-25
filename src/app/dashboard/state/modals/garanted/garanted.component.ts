import { Component, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { ResetService } from '../../shared/reset.service';
import { ResetForm } from '../../shared/reset.form';
import { Car } from '../../../../shared/models/car.model';
import { MsgService } from '../../../../shared/services/msg';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-garanted',
  templateUrl: './garanted.component.html',
  styleUrls: ['./garanted.component.css'],
})
export class GarantedComponent {
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
    this.resetService.resetGaranted(this.data).subscribe(
      () => {
        this.msg.notice(MsgService.SUCCESS, this.translateService.instant('warrantyService'), this.translateService.instant('prolonged'));
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
