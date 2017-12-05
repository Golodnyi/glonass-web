import { Component, Input } from '@angular/core';
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

  @Input() sensor: SchemeItem = null;
  @Input() allowedPorts: any[] = [];
  @Input() car: number;

  constructor(private schemeService: SchemeService, private msgService: MsgService) { }

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

    this.schemeService.setOverallScheme(this.car, this.sensor).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
        this.msgService.notice(MsgService.ERROR, 'Ошибка обновления датчика', error);
      }
    );
  }
}
