import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CompaniesComponent} from './companies/companies.component';
import {CompaniesService} from "../../services/companies.service";
import {SubdivisionsComponent} from "./subdivisions/subdivisions.component";
import {AccordionModule} from 'ng2-bootstrap/accordion';
import {TabsModule} from 'ng2-bootstrap/tabs';
import {SubdivisionsService} from "../../services/subdivisions.service";
import {CarsService} from "../../services/cars.service";
import {CarsComponent} from "./cars/cars.component";

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        AccordionModule.forRoot(),
        TabsModule.forRoot()
    ],
    declarations: [DashboardComponent, CompaniesComponent, SubdivisionsComponent, CarsComponent],
    bootstrap: [DashboardComponent],
    providers: [CompaniesService, SubdivisionsService, CarsService],
})
export class DashboardModule {
}
