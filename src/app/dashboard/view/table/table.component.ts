import { Component, OnDestroy } from '@angular/core';
import { ChartsService } from '../../../shared/services/charts.service';
import { Subscription } from 'rxjs/Subscription';
import { Car } from '../../../shared/models/car.model';

@Component({
  selector: 'app-table-view',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnDestroy {
  public car: Car;
  public inDrive: boolean;
  private subscription: Subscription = new Subscription();

  constructor(private chartsService: ChartsService) {
    this.subscription.add(
      this.chartsService.getCar().subscribe(car => {
        this.car = car;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
