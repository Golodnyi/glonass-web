import { Component, OnDestroy } from '@angular/core';
import { CarsService } from '../../shared/services/cars.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SubdivisionsService } from '../../shared/services/subdivisions.service';
import { Subdivision } from '../../shared/models/subdivision.model';
import { ChartsService } from '../../shared/services/charts.service';
import { MapCar } from '../ymaps/shared/map-car.model';
import { MapPolyLines } from '../ymaps/shared/map-polylines.model';
import { EnginesService } from '../../shared/services/engines.service';

@Component({
    selector   : 'app-company',
    templateUrl: './company.component.html',
    styleUrls  : ['./company.component.css']
})
export class CompanyComponent implements OnDestroy {
    public subdivisions: Subdivision[]  = [];
    public mapCars: MapCar[]            = [];
    public mapPolyLines: MapPolyLines[] = [];
    private subscription: Subscription  = new Subscription();

    constructor(
        private subdivisionsService: SubdivisionsService,
        private route: ActivatedRoute,
        private carsService: CarsService,
        private enginesService: EnginesService
    ) {
        this.subscription.add(
            this.route.params.subscribe(params => {
                const company_id = +params['company'];
                this.subdivisionsService.all_resync(company_id).subscribe(
                    subdivisions => {
                        this.subdivisions = subdivisions;
                        this.subdivisions.forEach(subdiv => {
                            this.carsService.all_sync(company_id, subdiv.id).subscribe(
                                cars => {
                                    subdiv.cars = cars;
                                    subdiv.cars.forEach(car => {
                                        this.enginesService.getSync(company_id, subdiv.id, car.id).subscribe(engine => {
                                            car.engine = engine;
                                        });
                                    });
                                }
                            );
                        });
                    }
                );
            })
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
