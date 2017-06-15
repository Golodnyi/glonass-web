import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
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
export class YmapsComponent implements OnInit, OnDestroy, OnChanges {
  public map: any;
  private center = [55.75370903771494, 37.61981338262558];
  private subscription: Subscription = new Subscription();
  @Input() car: Car;
  @Input() data: any;
  private build () {
    ymaps.ready().then(() => {
      if (this.map) {
        this.map.destroy();
      }
      if (this.data.length) {
        this.center = [this.data[this.data.length - 1][1], this.data[this.data.length - 1][2]];
        this.map = new ymaps.Map('ymap', {
          center: this.center,
          zoom: 12,
          controls: ['smallMapDefaultSet']
        });

        const lines = [];
        this.data.forEach(point => {
          lines.push([point[1], point[2]]);
        });

        this.map.geoObjects.add(
          new ymaps.Polyline(lines,
            {
              hintContent: 'Маршрут'
            },
            {
              strokeColor: '#000000',
              strokeWidth: 2
            })
        );

        this.map.geoObjects.add(new ymaps.Placemark(this.center, {
          hintContent: this.car.name,
          balloonContent: moment(this.data[this.data.length - 1][0]).format('DD.MM.YY h:mm:ss')
        }, {
          iconLayout: 'default#image',
          iconImageHref: '/assets/car.png',
          iconImageSize: [32, 32],
        }));
      }
    });
  }
  constructor() {
    this.build();
  }

  ngOnInit() {
    /** navigator.geolocation.getCurrentPosition(data => {
      this.center = [this.data.coords.latitude, this.data.coords.longitude];
    }); **/
  }

  ngOnChanges(changes) {
    if (changes.data && !changes.data.firstChange) {
      this.data = changes.data.currentValue;
      this.build();
    }
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.destroy();
    }
    this.subscription.unsubscribe();
  }
}
