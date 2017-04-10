import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CompaniesService} from "../../services/companies.service";
import {AccordionModule} from 'ng2-bootstrap/accordion';
import {TabsModule} from 'ng2-bootstrap/tabs';
import {SubdivisionsService} from "../../services/subdivisions.service";
import {CarsService} from "../../services/cars.service";
import {NavigationComponent} from "./navigation/navigation.component";
import {TreeModule} from 'primeng/primeng';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        AccordionModule.forRoot(),
        TabsModule.forRoot(),
        TreeModule
    ],
    declarations: [DashboardComponent, NavigationComponent],
    bootstrap: [DashboardComponent],
    providers: [CompaniesService, SubdivisionsService, CarsService],
})
export class DashboardModule {
}
