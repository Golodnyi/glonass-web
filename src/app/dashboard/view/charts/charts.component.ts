import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ChartsService} from '../../../shared/services/charts.service';
import {ActivatedRoute} from '@angular/router';
import {Car} from '../../../shared/models/car.model';

@Component({
  selector: 'app-charts-view',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnDestroy {
  private subscription: Subscription = new Subscription();
  public options: any = [];
  public loading = true;
  constructor(private chartsService: ChartsService) {
    console.log('component charts init');
    this.subscription.add(
      this.chartsService.getCar().subscribe(car => {
        this.update(car);
      })
    );
  }

  ngOnDestroy() {
    console.log('charts destroy');
    this.options = [];
    this.subscription.unsubscribe();
  }

  private update(car: Car) {
    this.subscription.add(
      this.chartsService.get().subscribe(
        data => {
          this.loading = true;
          if (!data.length) {
            this.options = [];
          }
          data.forEach(item => {
            let exist = false;
            this.options.forEach(options => {
              if (options.id === item.id) {
                options.data = item.data;
                exist = true;
              }
            });
            if (!exist) {
              this.options.push(item);
            }
          });
          this.loading = false;
        }
      )
    );
    this.chartsService.resync(car.id);
  }
}
