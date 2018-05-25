import { Component, OnDestroy } from '@angular/core';
import { ChartsService } from '../../../shared/services/charts.service';
import { Subscription } from 'rxjs/Subscription';
import { Car } from '../../../shared/models/car.model';
import { SelectItem } from 'primeng/primeng';
import { AuthService } from '../../../shared/services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector   : 'app-table-view',
    templateUrl: './table.component.html',
    styleUrls  : ['./table.component.css']
})
export class TableComponent implements OnDestroy {
    public car: Car;
    public inDrive: boolean;
    private subscription: Subscription = new Subscription();
    public selectedFilter: string[]    = [];
    public filter: SelectItem[]        = [];
    public filterUser: SelectItem[]    = [];
    public admin: boolean;

    constructor(private translateService: TranslateService, private chartsService: ChartsService,
                private authService: AuthService) {
        this.admin = this.authService.isAdmin();

        this.filter     = [];
        this.filterUser = [];

        this.translateService.stream(
            [
                'dashboard.inMove',
                'dashboard.microvolts',
                'dashboard.invalidData'
            ]).subscribe(value => {
            this.filter = [];
            this.filter.push({label: value['dashboard.inMove'], value: 'drive'});
            this.filter.push({label: value['dashboard.microvolts'], value: 'mv'});
            this.filter.push({label: value['dashboard.invalidData'], value: 'nv'});

            this.filterUser.push({label: value['dashboard.inMove'], value: 'drive'});
        });

        this.subscription.add(
            this.chartsService.getCar().subscribe(car => {
                this.car = car;
            })
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
