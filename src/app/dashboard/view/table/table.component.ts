import {Component, OnDestroy} from '@angular/core';
import {ChartsService} from '../../../shared/services/charts.service';
import {Subscription} from 'rxjs/Subscription';
import {Car} from '../../../shared/models/car.model';

@Component({
  selector: 'app-table-view',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnDestroy {
  private subscription: Subscription = new Subscription();
  private car: Car;

  constructor(private chartsService: ChartsService) {
    console.log('component table init');
    this.subscription.add(
      this.chartsService.getCar().subscribe(car => {
        this.car = car;
      })
    );
  }

  ngOnDestroy() {
    console.log('table destroy');
    this.subscription.unsubscribe();
  }
}
