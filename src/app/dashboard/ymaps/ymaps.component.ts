import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ChartsService } from '../../shared/services/charts.service';
import { Subscription } from 'rxjs/Subscription';
import { Car } from '../../shared/models/car.model';
import * as moment from 'moment';
/// <reference path="./typing/ymaps.d.ts" />
@Component({
  selector: 'app-ymaps',
  templateUrl: './ymaps.component.html',
  styleUrls: ['./ymaps.component.css']
})
export class YmapsComponent implements OnInit, OnDestroy {
  public map: any;
  private center = [55.75370903771494, 37.61981338262558];
  private subscription: Subscription = new Subscription();
  @Input() car: Car;
  constructor(private chartsService: ChartsService) {
    ymaps.ready().then(() => {
      this.subscription.add(this.chartsService.getMap().subscribe(data => {
          if (this.map) {
            this.map.destroy();
          }
          if (data.length) {
            this.center = [data[data.length - 1][1], data[data.length - 1][2]];
            this.map = new ymaps.Map('ymap', {
              center: this.center,
              zoom: 12,
              controls: ['smallMapDefaultSet']
            });
            data.forEach((point, index) => {
              if ((data.length - 1) === index) {
                return;
              }
              this.map.geoObjects.add(new ymaps.Placemark([point[1], point[2]], {
                hintContent: this.car.name,
                balloonContent: moment(point[0]).format('DD.MM.YY h:mm:ss')
              }, {
                iconLayout: 'default#image',
                iconImageHref: '/assets/car_history.png',
                iconImageSize: [32, 32],
              }));
            });
            this.map.geoObjects.add(new ymaps.Placemark(this.center, {
              hintContent: this.car.name,
              balloonContent: moment(data[data.length - 1][0]).format('DD.MM.YY h:mm:ss')
            }, {
              iconLayout: 'default#image',
              iconImageHref: '/assets/car.png',
              iconImageSize: [32, 32],
            }));
          }
        })
      );
    });
  }

  ngOnInit() {
    /** navigator.geolocation.getCurrentPosition(data => {
      this.center = [data.coords.latitude, data.coords.longitude];
    }); **/
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.destroy();
    }
    this.subscription.unsubscribe();
  }
}
