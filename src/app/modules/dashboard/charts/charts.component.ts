import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartsService } from '../../../services/charts.service';
import { MsgService } from '../../../services/msg';
import { CarsService } from '../../../services/cars.service';
import { Car } from '../../../models/Car';
import { Chart } from '../../../models/Chart';
import * as highstock from 'highcharts/highstock';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  public car: Car;
  public options: any;

  constructor(private route: ActivatedRoute,
              private chartsService: ChartsService,
              private msgService: MsgService,
              private carsService: CarsService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
        const car_id = +params['car'];
        this.carsService.get(car_id).subscribe(
          car => {
            this.car = car;
          }
        );
        this.chartsService.get(car_id).subscribe(
          data => {
            this.options = data;
          },
          error => {
            this.msgService.notice(MsgService.ERROR, 'Ошибка', error);
          }
        );
      }
    );
  }
}
