import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SchemeItem } from '../shared/schemeItem.model';
import { Car } from 'app/shared/models/car.model';
import { SchemeService } from 'app/admin/configurator/shared/scheme.service';
import { MsgService } from 'app/shared/services/msg';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css']
})
export class SensorComponent {
  @Output() sensorUpdated = new EventEmitter();

  @Input() sensor: SchemeItem = null;
  @Input() new = true;
  @Input() allowedPorts: any[] = [];
  @Input() car: number;
  @Input() sensorNames: any[];

  constructor(private schemeService: SchemeService, private msgService: MsgService) {
    if (this.new) {
      this.sensor = new SchemeItem();
    }
  }

  public onLimits(event: any) {
    if (event) {
      this.sensor.limits = {
        noticeLower: 0,
        noticeUpper: 0,
        warningLower: 0,
        warningUpper: 0
      };
    } else {
      this.sensor.limits = null;
    }
  }

  public submit() {
    if (!this.sensor || !this.car) {
      return false;
    }

    if (!confirm('Вы действительно хотите заменить датчик?')) {
      return false;
    }

    if (this.new) {
      this.schemeService.createOverallScheme(this.car, this.sensor).subscribe(
        data => {
          this.msgService.notice(MsgService.SUCCESS, 'Успех', data.message);
          this.sensorUpdated.emit();
        },
        error => {
          this.msgService.notice(MsgService.ERROR, 'Ошибка обновления датчика', error);
        }
      );
    } else {
      this.schemeService.updateOverallScheme(this.car, this.sensor).subscribe(
        data => {
          this.msgService.notice(MsgService.SUCCESS, 'Успех', data.message);
          this.sensorUpdated.emit();
        },
        error => {
          this.msgService.notice(MsgService.ERROR, 'Ошибка обновления датчика', error);
        }
      );
    }
  }
}
