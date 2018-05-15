import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Car } from '../../../../shared/models/car.model';
import { ResetService } from '../../shared/reset.service';

@Component({
  selector: 'app-maintenance-history',
  templateUrl: './maintenance-history.component.html',
  styleUrls: ['./maintenance-history.component.css']
})
export class MaintenanceHistoryComponent implements OnChanges {
  @Input() car: Car;
  @Input() visible: boolean;
  @Output() hide = new EventEmitter();
  public histories = [];

  constructor(private resetService: ResetService) { }

  ngOnChanges(changes: any) {
    if (!this.car || this.car === undefined || !this.visible) {
      return false;
    }

    this.resetService.all(this.car).subscribe(
      data => {
        this.histories = [];
        data.forEach(item => {
          this.histories.push(item);
        });
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
