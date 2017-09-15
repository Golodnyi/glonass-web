import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {MapCar} from './shared/map-car.model';
import {MapPolyLines} from './shared/map-polylines.model';

/// <reference path="./typings/ymaps.d.ts" />
@Component({
  selector: 'app-ymaps',
  templateUrl: './ymaps.component.html',
  styleUrls: ['./ymaps.component.css']
})
export class YmapsComponent implements OnInit, OnDestroy, OnChanges {
  public map: any;
  @Input() cars: MapCar[];
  @Input() polyLines: MapPolyLines[];
  @Input() zoom = 0;
  private center = [55.75370903771494, 37.61981338262558];

  constructor() {
    this.build();
    console.log('Map init');
  }

  ngOnInit() {
    /** navigator.geolocation.getCurrentPosition(data => {
      this.center = [this.data.coords.latitude, this.data.coords.longitude];
    }); **/
  }

  ngOnChanges(changes) {
    if (changes.cars && !changes.cars.firstChange) {
      this.cars = changes.cars.currentValue;
      this.build();
    }
    if (changes.polyLines && !changes.polyLines.firstChange) {
      this.polyLines = changes.polyLines.currentValue;
      this.build();
    }
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.destroy();
    }
  }

  private build() {
    ymaps.ready().then(() => {
      if (this.cars.length) {
        const lastCar = this.cars[this.cars.length - 1];
        this.center = lastCar.point;
      }
      if (this.map) {
        this.map.geoObjects.each(item => {
          item.remove();
        });
        // this.map.destroy();
      } else {
        this.map = new ymaps.Map('ymap', {
          center: this.center,
          zoom: (!this.zoom ? 12 : this.zoom),
          controls: ['smallMapDefaultSet', 'rulerControl']
        });
      }

      this.map.panTo(
        [this.center], {
          flying: false
        }
      );

      this.polyLines.forEach(polyLine => {
        polyLine.points.forEach(point => {
          this.map.geoObjects.add(
            new ymaps.Circle([[point[0], point[1]], 1], {}, {
              fillColor: point[2],
              strokeColor: point[2],
            })
          );
        });
      });

      this.cars.forEach(car => {
        this.map.geoObjects.add(new ymaps.Placemark(car.point, {
          hintContent: car.name
        }, {
          iconLayout: 'default#image',
          iconImageHref: '/assets/car.png',
          iconImageSize: [32, 32],
        }));
      });

    });
  }
}
