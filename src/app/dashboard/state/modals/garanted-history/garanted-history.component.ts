import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { ResetService } from '../../shared/reset.service';
import { Car } from '../../../../shared/models/car.model';

@Component({
  selector: 'app-garanted-history',
  templateUrl: './garanted-history.component.html',
  styleUrls: ['./garanted-history.component.css']
})
export class GarantedHistoryComponent implements OnChanges {
  @Input() car: Car;
  @Input() visible: boolean;
  @Output() hide = new EventEmitter();
  public histories = [];

  constructor(private resetService: ResetService) { }

  ngOnChanges(changes: any) {
    if (!this.car || this.car === undefined || !this.visible) {
      return false;
    }

    this.resetService.allGaranted(this.car).subscribe(
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
