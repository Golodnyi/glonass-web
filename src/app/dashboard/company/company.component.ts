import {Component, OnDestroy} from '@angular/core';
import {CarsService} from '../../shared/services/cars.service';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';
import {SubdivisionsService} from '../../shared/services/subdivisions.service';
import {Subdivision} from '../../shared/models/subdivision.model';
import {ChartsService} from '../../shared/services/charts.service';
import {MapCar} from '../ymaps/shared/map-car.model';
import {MapPolyLines} from '../ymaps/shared/map-polylines.model';
import {TimerObservable} from 'rxjs/observable/TimerObservable';
import {EnginesService} from '../../shared/services/engines.service';

@Component({
    selector   : 'app-company',
    templateUrl: './company.component.html',
    styleUrls  : ['./company.component.css']
})
export class CompanyComponent implements OnDestroy {
    public subdivisions: Subdivision[]        = [];
    public mapCars: MapCar[]                  = [];
    public mapPolyLines: MapPolyLines[]       = [];
    private subscriptionTimer: Subscription[] = [];
    private subscription: Subscription        = new Subscription();
    private timer                             = TimerObservable.create(0, 5000);
    private mpl: MapPolyLines[];
    private mc: MapCar[];

    constructor(private subdivisionsService: SubdivisionsService,
                private carsService: CarsService,
                private enginesService: EnginesService,
                private route: ActivatedRoute,
                private chartsService: ChartsService) {
        /**
         * TODO: нужен рефакторинг
         */
        this.subscription.add(
            this.route.params.subscribe(params => {
                this.mc          = [];
                this.mpl         = [];
                const company_id = +params['company'];
                if (this.subscriptionTimer.length) {
                    this.subscriptionTimer.forEach(s => {
                        s.unsubscribe();
                    });
                }
                this.subdivisionsService.all_resync(company_id).subscribe(
                    subdivisions => {
                        this.subdivisions = subdivisions;
                        this.subdivisions.forEach(subdiv => {
                            this.carsService.all_sync(company_id, subdiv.id).subscribe(
                                cars => {
                                    subdiv.cars = cars;
                                    subdiv.cars.forEach(car => {
                                        this.enginesService.get(company_id, subdiv.id, car.id, true).subscribe(engine => {
                                            car.engine = engine;
                                        });

                                        this.chartsService.mapData(car).subscribe(data => {
                                            if (data && data.length) {
                                                const mCar = new MapCar();
                                                mCar.name  = car.name;
                                                mCar.point = [data[data.length - 1][1], data[data.length - 1][2]];

                                                const polyLines = new MapPolyLines();
                                                polyLines.name  = 'Маршрут';
                                                polyLines.color = '#' + Math.random().toString(16).substr(-6);
                                                let clr         = '#000';
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

                                                this.mc.push(mCar);
                                                this.mpl.push(polyLines);
                                            }
                                        });
                                    });
                                }
                            );
                        });
                    }
                );
                this.mapCars      = this.mc;
                this.mapPolyLines = this.mpl;
            })
        );
    }

    ngOnDestroy() {
        this.subscriptionTimer.forEach(s => {
            s.unsubscribe();
        });
        this.subscription.unsubscribe();
    }
}
