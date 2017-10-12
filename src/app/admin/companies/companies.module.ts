import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  AutoCompleteModule,
  ButtonModule,
  CalendarModule,
  CheckboxModule,
  DropdownModule,
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
import {CompaniesService} from '../../shared/services/companies.service';
import {SubdivisionsService} from '../../shared/services/subdivisions.service';
import {CarsService} from '../../shared/services/cars.service';
import {EnginesService} from '../../shared/services/engines.service';
import {CompanyUpdateComponent} from './company/update/update.component';
import {CompanyCreateComponent} from './company/create/create.component';
import {SubdivisionCreateComponent} from './subdivision/create/create.component';
import {SubdivisionUpdateComponent} from './subdivision/update/update.component';
import {TreePipe} from '../../shared/pipes/tree.pipe';
import {SharedModule} from '../../shared/shared.module';
import {CarCreateComponent} from './car/create/create.component';
import {CarModelsService} from '../../shared/services/car.models.service';
import {CarUpdateComponent} from './car/update/update.component';
import {EngineCreateComponent} from './engine/create/create.component';

@NgModule({
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TreeModule,
    InputTextModule,
    ButtonModule,
    CalendarModule,
    TabMenuModule,
    ToolbarModule,
    SharedModule,
    DropdownModule,
    CheckboxModule,
    AutoCompleteModule
  ],
  declarations: [
    NavigationComponent, CompaniesComponent, CompanyUpdateComponent, CompanyCreateComponent,
    CarComponent, EngineComponent, SubdivisionCreateComponent, SubdivisionUpdateComponent,
    CarCreateComponent, CarUpdateComponent, EngineCreateComponent
  ],
  providers: [CompaniesService, SubdivisionsService, CarsService, EnginesService, TreePipe, CarModelsService],
})
export class CompaniesModule {
}
