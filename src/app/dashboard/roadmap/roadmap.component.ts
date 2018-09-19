import { CarsService } from './../../shared/services/cars.service';
import { Subdivision } from './../../shared/models/subdivision.model';
import { RoadMapService } from './shared/roadmap.service';
import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { ChartsService } from '../../shared/services/charts.service';
import * as moment from 'moment';

/// <reference path="./typings/ymaps.d.ts" />
@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.css']
})
export class RoadmapComponent implements OnInit, OnDestroy, OnChanges {
  public map: any;
  @Input()
  subdivisions: Subdivision[];
  @Input()
  zoom = 12;
  private cars = [];
  public polyLines: any;
  private center = [55.75370903771494, 37.61981338262558];
  public roadMaps = [];
  public filterDate = new Date();

  constructor(
    private roadMapService: RoadMapService,
    private carService: CarsService,
    private chartsService: ChartsService
  ) {}

  ngOnInit() {}

  public filter() {
    this.destroy();
    this.buildTrack();
  }

  private buildTrack() {
    this.roadMaps = [];
    this.cars = [];

    this.subdivisions.forEach((subdivision, index) => {
      this.carService.all_sync(1, subdivision.id).subscribe(cars => {
        cars.forEach(car => {
          const timestamp = Number(moment(this.filterDate).format('x'));
          this.roadMapService.car(car, timestamp).subscribe(location => {
            if (location.location.length) {
              location.name = car.name;
              this.cars.push(location);
              if (index + 1 === this.subdivisions.length) {
                this.addCars();
              }
            }
          });
        });
      });
      this.roadMapService.get(subdivision.id).subscribe(data => {
        this.roadMaps.push(data);
        if (this.roadMaps.length === this.subdivisions.length) {
          this.buildRoadMap();
        }
      });
    });
  }

  private destroy() {
    if (this.map) {
      this.map.destroy();
      this.roadMaps = [];
      this.cars = [];
    }
  }

  ngOnDestroy() {
    this.destroy();
  }

  ngOnChanges() {
    this.destroy();
    this.buildTrack();
  }

  private buildRoadMap() {
    ymaps.ready().then(() => {
      this.map = new ymaps.Map('ymap', {
        center: this.center,
        zoom: !this.zoom ? 12 : this.zoom,
        controls: ['smallMapDefaultSet', 'rulerControl']
      });

      this.buildPoints();

      // this.map.geoObjects.add(this.polyLines);
      // this.map.setBounds(this.polyLines.geometry.getBounds());
    });
  }

  private buildPoints() {
    let change = false;
    this.roadMaps.forEach(roadMaps => {
      Object.keys(roadMaps.edges).forEach(key => {
        if (!change) {
          ymaps.ready().then(() => {
            this.map.panTo([roadMaps.points[key][1], roadMaps.points[key][0]], {
              flying: false
            });
            change = true;
          });
        }

        const point = [];

        let alt = 0;
        point.push([roadMaps.points[key][1], roadMaps.points[key][0]]);
        alt += roadMaps.points[key][2];
        roadMaps.edges[key].forEach(edge => {
          point.push([roadMaps.points[edge][1], roadMaps.points[edge][0]]);
          alt += roadMaps.points[edge][2];
        });
        alt /= roadMaps.edges[key].length + 1; // +1 т.к. 109 строка складывает дополнительное значение
        const normal_alt =
          (((alt - roadMaps.altRange[0]) * 100) /
          (roadMaps.altRange[1] - roadMaps.altRange[0]) * 1.2) + 240;

          this.addPoint(point, this.hslToHex(normal_alt, 100, 50), alt);
      });
    });
  }

  public getSpectrum(i: number) {
    return this.hslToHex(i, 100, 50);
  }

  private addPoint(points, color, alt) {
    ymaps.ready().then(() => {
      this.map.geoObjects.add(
        new ymaps.Polyline(
          points,
          {
            hintContent: 'Высота: ' + parseInt(alt, 10) + 'м.'
          },
          {
            strokeColor: color,
            strokeWidth: 4,
            strokeStyle: '2 0'
          }
        )
      );
    });
  }

  private addCars() {
    ymaps.ready().then(() => {
      this.cars.forEach(car => {
        this.map.geoObjects.add(
          new ymaps.Placemark(
            [car.location[1], car.location[2]],
            {
              iconContent: car.name,
              hintContent: moment
                .unix(car.location[0] / 1000)
                .format('DD.MM.YYYY H:mm')
            },
            {
              iconLayout: 'default#imageWithContent',
              iconImageHref: '/assets/car.png',
              iconImageSize: [32, 32],
              iconContentOffset: [-10, -34],
              iconContentLayout: ymaps.templateLayoutFactory.createClass(
                `<div class="contentLayout" title="$[properties.hintContent]">
                $[properties.iconContent]
              </div>`
              )
            }
          )
        );
      });
    });
  }

  private hslToHex(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p1, q1, t1) => {
        if (t1 < 0) {
          t1 += 1;
        }
        if (t1 > 1) {
          t1 -= 1;
        }
        if (t1 < 1 / 6) {
          return p1 + (q1 - p1) * 6 * t1;
        }
        if (t1 < 1 / 2) {
          return q1;
        }
        if (t1 < 2 / 3) {
          return p1 + (q1 - p1) * (2 / 3 - t1) * 6;
        }
        return p1;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    const toHex = x => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }
}
