import { Subdivision } from './../../../shared/models/subdivision.model';
import { Component, OnDestroy } from '@angular/core';
import { ChartsService } from '../../../shared/services/charts.service';
import { Car } from '../../../shared/models/car.model';
import { Subscription } from 'rxjs';
import { MapCar } from '../../ymaps/shared/map-car.model';
import { MapPolyLines } from '../../ymaps/shared/map-polylines.model';
import { RoadMapService } from '../../roadmap/shared/roadmap.service';
import { SubdivisionsService } from '../../../shared/services/subdivisions.service';

@Component({
    selector   : 'app-map-view',
    templateUrl: './map.component.html',
    styleUrls  : ['./map.component.css']
})
export class MapComponent implements OnDestroy {
    public subdivisions: Subdivision[] = [];

    constructor(private subdivisionsService: SubdivisionsService, private chartsService: ChartsService) {
        this.chartsService.getCar().subscribe(car => {
            if (car === null) {
                return;
            }

            this.subdivisionsService.get_resync(1, car.subdivision_id).subscribe(subs => {
                this.subdivisions.push(subs);
            });
        });
    }

    ngOnDestroy() {
        this.subdivisions = [];
    }
}
