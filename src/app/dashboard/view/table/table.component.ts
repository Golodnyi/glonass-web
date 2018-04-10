import { Component, OnDestroy } from '@angular/core';
import { ChartsService } from '../../../shared/services/charts.service';
import { Subscription } from 'rxjs/Subscription';
import { Car } from '../../../shared/models/car.model';
import { SelectItem } from 'primeng/primeng';
import { AuthService } from '../../../shared/services/auth.service';
import { User } from '../../../shared/models/user.model';

@Component({
    selector: 'app-table-view',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})
export class TableComponent implements OnDestroy {
    public car: Car;
    public inDrive: boolean;
    private subscription: Subscription = new Subscription();
    public selectedFilter: string[] = [];
    public filter: SelectItem[] = [];
    public filterUser: SelectItem[] = [];
    public admin: boolean;

    constructor(private chartsService: ChartsService, private authService: AuthService) {
        this.admin = this.authService.isAdmin();

        this.filter = [];
        this.filterUser = [];

        this.filter.push({ label: 'В движении', value: 'drive' });
        this.filter.push({ label: 'Микровольты', value: 'mv' });
        this.filter.push({ label: 'Невалидные данные', value: 'nv' });

        this.filterUser.push({ label: 'В движении', value: 'drive' });

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
