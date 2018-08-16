import { CarsService } from './../../shared/services/cars.service';
import { Subdivision } from './../../shared/models/subdivision.model';
import { MapCar } from './../ymaps/shared/map-car.model';
import { Subscription, Subscriber } from 'rxjs';
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
  private roadMaps = [];
  private points = [];

  constructor(
    private roadMapService: RoadMapService,
    private carService: CarsService,
    private chartsService: ChartsService
  ) {}

  ngOnInit() {
  }

  private buildTrack() {
    this.subdivisions.forEach((subdivision, index) => {
      this.carService.all_sync(1, subdivision.id).subscribe(cars => {
        cars.forEach(car => {
          this.roadMapService.car(car).subscribe(
            location => {
              location.name = car.name;
              this.cars.push(location);
              if ((index + 1) === this.subdivisions.length) {
                this.addCars();
              }
            }
          );
        });
      });
      this.roadMapService.get(subdivision.id).subscribe(data => {
        this.roadMaps.push(data);
        if (this.roadMaps.length === this.subdivisions.length) {
          this.buildRoadMap();
        }
      })
    });
  }

  private destroy() {
    if (this.map) {
      this.map.destroy();
      this.points = [];
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
        controls: ['smallMapDefaultSet', 'rulerControl'],
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
          this.map.panTo([roadMaps.points[key][1], roadMaps.points[key][0]], {
            flying: false
          });
          change = true;
        }

        const point = [];
        let color;

        let alt = 0;
        point.push([roadMaps.points[key][1], roadMaps.points[key][0]]);
        alt += roadMaps.points[key][2];
        roadMaps.edges[key].forEach(edge => {
          point.push([roadMaps.points[edge][1], roadMaps.points[edge][0]]);
          alt += roadMaps.points[key][2];
        });
        alt /= roadMaps.edges[key].length + 1;

        const elevation = parseInt(this.roadMaps[0].elevation, 10);
        const normal_alt = alt - elevation;

        if (Math.abs(normal_alt) <= 10) {
          color = 'rgba(0, 0, 0, 1)';
        } else if (normal_alt <= -11 && normal_alt >= -50) {
          color = 'rgba(85, 85, 85, 1)';
        } else if (normal_alt <= -51 && normal_alt >= -100) {
          color = 'rgba(170, 170, 170, 1)';
        } else if (normal_alt <= -100) {
          color = 'rgba(200, 200, 200, 1)';
        } else if (normal_alt >= 11 && normal_alt <= 50) {
          color = 'rgba(85, 0, 0, 1)';
        } else if (normal_alt >= 51 && normal_alt <= 100) {
          color = 'rgba(170, 0, 0, 1)';
        } else {
          color = 'rgba(200, 0, 0, 1)';
        }

        this.addPoint(point, color, alt);
      });
    });
  }

  private addPoint(points, color, alt) {
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
  }

  private addCars() {
    this.cars.forEach(car => {
      this.map.geoObjects.add(new ymaps.Placemark([car.location[1], car.location[2]], {
          iconContent: car.name,
          hintContent: moment.unix(car.location[0] / 1000).format('DD.MM.YYYY H:mm')
      }, {
          iconLayout   : 'default#imageWithContent',
          iconImageHref: '/assets/car.png',
          iconImageSize: [32, 32],
          iconContentOffset: [-10, -34],
          iconContentLayout: ymaps.templateLayoutFactory.createClass(
            `<div class="contentLayout" title="$[properties.hintContent]">
              $[properties.iconContent]
            </div>`
          )
      }));
  });
  }
}
