import { Component, EventEmitter, Output } from '@angular/core';
import { CompaniesService } from 'app/shared/services/companies.service';
import { SubdivisionsService } from 'app/shared/services/subdivisions.service';
import { CarsService } from 'app/shared/services/cars.service';
import { Company } from 'app/shared/models/company.model';
import { Subdivision } from 'app/shared/models/subdivision.model';
import { Car } from 'app/shared/models/car.model';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs';

@Component({
    selector   : 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls  : ['./navigation.component.css'],
    providers  : [CompaniesService, SubdivisionsService, CarsService]
})
export class NavigationComponent implements OnDestroy {
    @Output() carUpdated = new EventEmitter();

    public companies: Company[];
    public subdivisions: Subdivision[];
    public cars: Car[];

    private subscription: Subscription = new Subscription();
    private company_id: number;
    private subdivision_id: number;

    constructor(private companiesService: CompaniesService,
                private subdivisionsService: SubdivisionsService,
                private carsService: CarsService) {
        this.subscription.add(
            this.companiesService.all(true).subscribe(
                companies => {
                    this.companies = companies;
                }
            )
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    public companySelect(event: any): void {
        if (!event || !event.value) {
            return;
        }

        this.company_id = event.value;

        this.subdivisionsService.all_resync(this.company_id).subscribe(
            subdivisions => {
                this.subdivisions = subdivisions;
                this.cars         = null;
            }
        );
    }

    public subdivisionSelect(event: any): void {
        if (!event || !event.value) {
            return;
        }

        this.subdivision_id = event.value;

        this.carsService.all_sync(this.company_id, this.subdivision_id).subscribe(
            cars => {
                this.cars = cars;
            }
        );
    }

    public carSelect(event: any): void {
        if (!event || !event.value) {
            return;
        }

        this.carUpdated.emit(event.value);
    }
}
