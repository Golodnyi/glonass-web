import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompaniesService } from '../../services/companies.service';
import { SubdivisionsService } from '../../services/subdivisions.service';
import { CarsService } from '../../services/cars.service';
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
import { TreePipe } from '../../pipes/tree.pipe';
import { SharedModule } from '../shared.module';
import { ChartsService } from '../../services/charts.service';
import { StateComponent } from './state/state.component';
import { FilterComponent } from './filter/filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  providers: [CompaniesService, SubdivisionsService, CarsService, TreePipe, ChartsService]
})
export class DashboardModule {
}
