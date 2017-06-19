import { Component, OnDestroy } from '@angular/core';
import { CarsService } from '../../shared/services/cars.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { SubdivisionsService } from '../../shared/services/subdivisions.service';
import { Subdivision } from '../../shared/models/subdivision.model';
import { ChartsService } from '../../shared/services/charts.service';
import { MapCar } from '../ymaps/shared/map-car.model';
import { MapPolyLines } from '../ymaps/shared/map-polylines.model';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnDestroy {
  private subscription: Subscription = new Subscription();
  public subdivisions: Subdivision[];
  public mapCars: MapCar[];
  public mapPolyLines: MapPolyLines[];

  constructor(private subdivisionsService: SubdivisionsService,
              private carsService: CarsService,
              private route: ActivatedRoute,
              private chartsService: ChartsService) {
    /**
     * TODO: нужен рефакторинг
     */
    this.subscription.add(this.route.params.subscribe(params => {
        this.mapCars = [];
        this.mapPolyLines = [];
        const company_id = +params['company'];
        this.subscription.add(
          this.subdivisionsService.all(company_id, true).subscribe(
            subdivisions => {
              this.subdivisions = subdivisions;
              this.subdivisions.forEach(subdiv => {
                this.subscription.add(
                  this.carsService.all_sync(company_id, subdiv.id).subscribe(
                    cars => {
                      subdiv.cars = cars;
                      subdiv.cars.forEach(car => {
                        this.subscription.add(
                          this.chartsService.mapData(car.id).subscribe(data => {
                            if (data && data.length) {
                              const mCar = new MapCar();
                              mCar.name = car.name;
                              mCar.point = [data[data.length - 1][1], data[data.length - 1][2]];
                              this.mapCars.push(mCar);
                              const polyLines = new MapPolyLines();
                              polyLines.name = 'Маршрут';
                              polyLines.color = '#000000';
                              data.forEach(d => {
                                polyLines.points.push([d[1], d[2]]);
                              });
                              this.mapPolyLines.push(polyLines);
                            }
                          }));
                        this.subscription.add(
                          this.carsService.getState(car.id).subscribe(
                            state => {
                              car.state = state;
                            }
                          )
                        );
                      });
                    }
                  )
                );
              });
            }
          )
        );
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
