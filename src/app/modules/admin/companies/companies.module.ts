import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  AutoCompleteModule,
  ButtonModule,
  CalendarModule,
  InputTextModule,
  TabMenuModule,
  ToolbarModule,
  TreeModule
} from 'primeng/primeng';
import {CompaniesRoutingModule} from './companies-routing.module';
import {NavigationComponent} from './navigation/navigation.component';
import {CarComponent} from './car/car.component';
import {EngineComponent} from './engine/engine.component';
import {CompaniesComponent} from './companies/companies.component';
import {CompaniesService} from '../../../services/companies.service';
import {SubdivisionsService} from '../../../services/subdivisions.service';
import {CarsService} from '../../../services/cars.service';
import {EnginesService} from '../../../services/engines.service';
import {CompanyUpdateComponent} from './company/update/update.component';
import {CompanyCreateComponent} from './company/create/create.component';
import {SubdivisionCreateComponent} from './subdivision/create/create.component';
import {SubdivisionUpdateComponent} from './subdivision/update/update.component';

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
    AutoCompleteModule,
    ToolbarModule
  ],
  declarations: [NavigationComponent, CompaniesComponent, CompanyUpdateComponent, CompanyCreateComponent, CarComponent, EngineComponent, SubdivisionCreateComponent, SubdivisionUpdateComponent],
  providers: [CompaniesService, SubdivisionsService, CarsService, EnginesService],
})
export class CompaniesModule {
}
