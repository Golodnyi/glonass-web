import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  AutoCompleteModule,
  ButtonModule,
  CalendarModule,
  DropdownModule,
  InputTextModule,
  TabMenuModule,
  ToolbarModule,
  TreeModule
} from 'primeng/primeng';
import { CompaniesRoutingModule } from './companies-routing.module';
import { NavigationComponent } from './navigation/navigation.component';
import { CarComponent } from './car/car.component';
import { EngineComponent } from './engine/engine.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompaniesService } from '../../shared/services/companies.service';
import { SubdivisionsService } from '../../shared/services/subdivisions.service';
import { CarsService } from '../../shared/services/cars.service';
import { EnginesService } from '../../shared/services/engines.service';
import { CompanyUpdateComponent } from './company/update/update.component';
import { CompanyCreateComponent } from './company/create/create.component';
import { SubdivisionCreateComponent } from './subdivision/create/create.component';
import { SubdivisionUpdateComponent } from './subdivision/update/update.component';
import { TreePipe } from '../../shared/pipes/tree.pipe';
import { SharedModule } from '../../shared/shared.module';

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
    AutoCompleteModule
  ],
  declarations: [
    NavigationComponent, CompaniesComponent, CompanyUpdateComponent, CompanyCreateComponent,
    CarComponent, EngineComponent, SubdivisionCreateComponent, SubdivisionUpdateComponent
  ],
  providers: [CompaniesService, SubdivisionsService, CarsService, EnginesService, TreePipe],
})
export class CompaniesModule {
}
