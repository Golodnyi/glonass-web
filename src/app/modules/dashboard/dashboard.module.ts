import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CompaniesComponent} from './companies/companies.component';
import {CompaniesService} from "../../services/companies.service";

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule
    ],
    declarations: [DashboardComponent, CompaniesComponent],
    bootstrap: [DashboardComponent],
    providers: [CompaniesService],
})
export class DashboardModule {
}
