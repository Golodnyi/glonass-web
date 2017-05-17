import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartsService } from '../../../services/charts.service';
import { MsgService } from '../../../services/msg';
import { CarsService } from '../../../services/cars.service';
import { Car } from '../../../models/Car';
import { Chart } from '../../../models/Chart';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  public car: Car;
  public settings = new Chart();
  public options = [];
  public filterData = [];

  constructor(private route: ActivatedRoute,
              private chartsService: ChartsService,
              private msgService: MsgService,
              private carsService: CarsService) {
  }

  ngOnInit() {
    /**
     * TODO: нужен рефакторинг
     */
    this.route.params.subscribe(params => {
        const car_id = +params['car'];
        this.carsService.get(car_id).subscribe(
          car => {
            this.car = car;
          }
        );
        this.chartsService.get(car_id).subscribe(
          data => {
            if (data === null) {
              return false;
            }
            const template = Object.assign(this.settings);
            const charts = [];
            const filterData = [];
            data.forEach(function (item: any) {
              filterData.push({label: item.name, value: item.id});
              template.title = {
                text: item.name,
                align: 'left',
                marginBottom: 10,
                x: -10
              };
              template.series = [{
                data: item.data,
                name: item.name,
                type: item.type,
                tooltip: {
                  valueSuffix: ' ' + item.unit
                }
              }];
              template.yAxis = {
                crosshair: true,
                events: {
                  setExtremes: null
                },
                plotBands: item.plotBands,
                plotLines: item.plotLines
              };
              charts.push(Object.assign({}, template));
            });
            this.options = charts;
            this.filterData = filterData;
          },
          error => {
            this.msgService.notice(MsgService.ERROR, 'Ошибка', error);
          }
        );
      }
    );
  }
}
