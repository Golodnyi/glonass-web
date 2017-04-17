import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TreeModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';
import {TabMenuModule} from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/primeng';
import {CompaniesRoutingModule} from './companies-routing.module';
import {NavigationComponent} from './navigation/navigation.component';
import {CompanyComponent} from './company/company.component';
import {CarComponent} from './car/car.component';
import {EngineComponent} from './engine/engine.component';
import {SubdivisionComponent} from './subdivision/subdivision.component';
import {CompaniesComponent} from './companies/companies.component';
import {CompaniesService} from '../../../services/companies.service';
import {SubdivisionsService} from '../../../services/subdivisions.service';
import {CarsService} from '../../../services/cars.service';
import {EnginesService} from '../../../services/engines.service';

@NgModule({
    imports: [
        CommonModule,
        CompaniesRoutingModule,
        FormsModule,
        TreeModule,
        InputTextModule,
        ButtonModule,
        CalendarModule,
        TabMenuModule,
        AutoCompleteModule
    ],
    declarations: [NavigationComponent, CompaniesComponent, CompanyComponent, CarComponent, EngineComponent, SubdivisionComponent],
    providers: [CompaniesService, SubdivisionsService, CarsService, EnginesService],
})
export class CompaniesModule {
}
