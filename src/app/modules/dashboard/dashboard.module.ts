import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CompaniesComponent} from './companies/companies.component';
import {CompaniesService} from "../../services/companies.service";
import {SubdivisionsComponent} from "./subdivisions/subdivisions.component";
import {AccordionModule} from 'ng2-bootstrap/accordion';
import {SubdivisionsService} from "../../services/subdivisions.service";

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        AccordionModule.forRoot()
    ],
    declarations: [DashboardComponent, CompaniesComponent, SubdivisionsComponent],
    bootstrap: [DashboardComponent],
    providers: [CompaniesService, SubdivisionsService],
})
export class DashboardModule {
}
