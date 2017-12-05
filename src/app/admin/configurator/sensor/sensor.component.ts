import { Component, Input } from '@angular/core';
import { SchemeItem } from '../shared/schemeItem.model';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css']
})
export class SensorComponent {

  @Input() sensor: SchemeItem = null;
  @Input() allowedPorts: any[] = [];

  constructor() { }

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
}
