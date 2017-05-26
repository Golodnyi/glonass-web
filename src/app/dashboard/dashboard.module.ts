import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompaniesService } from '../shared/services/companies.service';
import { SubdivisionsService } from '../shared/services/subdivisions.service';
import { CarsService } from '../shared/services/cars.service';
import { NavigationComponent } from './navigation/navigation.component';
import {
  AccordionModule,
  CalendarModule,
  CheckboxModule,
  InputSwitchModule,
  MultiSelectModule,
  TreeModule
} from 'primeng/primeng';
import { ChartsComponent } from './charts/charts.component';
import { TreePipe } from '../shared/pipes/tree.pipe';
import { SharedModule } from '../shared/shared.module';
import { ChartsService } from '../shared/services/charts.service';
import { StateComponent } from './state/state.component';
import { FilterComponent } from './filter/filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SensorsService } from '../shared/services/sensors.service';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    TreeModule,
    SharedModule,
    MultiSelectModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule,
    InputSwitchModule,
    CheckboxModule
  ],
  declarations: [DashboardComponent, NavigationComponent, ChartsComponent, StateComponent, FilterComponent],
  providers: [CompaniesService, SubdivisionsService, CarsService, TreePipe, ChartsService, SensorsService]
})
export class DashboardModule {
}
