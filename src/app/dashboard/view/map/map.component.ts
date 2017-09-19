import {Component, OnDestroy} from '@angular/core';
import {ChartsService} from '../../../shared/services/charts.service';
import {Car} from '../../../shared/models/car.model';
import {Subscription} from 'rxjs/Subscription';
import {MapCar} from '../../ymaps/shared/map-car.model';
import {MapPolyLines} from '../../ymaps/shared/map-polylines.model';

@Component({
  selector: 'app-map-view',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnDestroy {
  private subscription: Subscription = new Subscription();
  public mapCars: MapCar[] = [];
  public mapPolyLines: MapPolyLines[] = [];
  public loading = true;

  constructor(private chartsService: ChartsService) {
    console.log('component map init');
    this.subscription.add(
      this.chartsService.getFilter().subscribe(
        () => {
          console.log('filter update');
          this.subscription.add(
            this.chartsService.getCar().subscribe(car => {
              this.update(car);
            })
          );
        }
      )
    );
  }

  ngOnDestroy() {
    console.log('map destroy');
    this.mapCars = [];
    this.mapPolyLines = [];
    this.subscription.unsubscribe();
  }

  private update(car: Car) {
    if (car === null) {
      return;
    }
    this.chartsService.mapData(car).subscribe(data => {
      this.loading = true;
      this.mapCars = [];
      this.mapPolyLines = [];

      if (data.length) {
        const mapCar = new MapCar();
        mapCar.name = car.name;
        mapCar.point = [data[data.length - 1][1], data[data.length - 1][2]];
        this.mapCars.push(mapCar);
        const polyLines = new MapPolyLines();
        polyLines.name = 'Маршрут';
        let clr = '#000';
        data.forEach(d => {
          if (d[3] === 'g') {
            clr = '#00AA00';
          } else if (d[3] === 'r') {
            clr = '#AA0000';
          } else if (d[3] === 'y') {
            clr = '#FFD700';
          }
          polyLines.points.push([d[1], d[2], clr]);
        });
        this.mapPolyLines.push(polyLines);
      }
      console.log(this.mapPolyLines);
      this.loading = false;
    });
  }
}
