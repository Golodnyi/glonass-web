import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartsService } from '../../../services/charts.service';
import { MsgService } from '../../../services/msg';
import { CarsService } from '../../../services/cars.service';
import { Car } from '../../../models/Car';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  public car: Car;
  public settings = {
    chart: {
      marginLeft: 40,
      spacingTop: 20,
      spacingBottom: 20
    },
    credits: {
      enabled: false
    },
    legend: {
      enabled: false
    },
    xAxis: {
      crosshair: true,
      events: {
        setExtremes: null
      }
    },
    tooltip: {
      positioner: function () {
        return {
          x: this.chart.chartWidth - this.label.width,
          y: -1
        };
      },
      borderWidth: 0,
      backgroundColor: 'none',
      pointFormat: '{point.y}',
      headerFormat: '',
      shadow: false,
      style: {
        fontSize: '18px'
      }
    },
  };
  public options = [];
  public data: any;

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
        const template = Object.assign(this.settings);
        const charts = [];
        const car_id = +params['car'];
        this.carsService.get(car_id).subscribe(
          car => {
            this.car = car;
          }
        );
        this.chartsService.get(car_id).subscribe(
          data => {
            data.forEach(function (item: any) {
              template.title = {
                text: item.name,
                align: 'left',
                margin: 0,
                x: 30
              };
              template.series = [{
                data: item.data,
                name: item.name,
                type: item.type,
                tooltip: {
                  valueSuffix: ' ' + item.unit
                }
              }];
              charts.push(Object.assign({}, template));
            });
            this.options = charts;
          },
          error => {
            this.msgService.notice(MsgService.ERROR, 'Ошибка', error);
          }
        );
      }
    );
  }
}
