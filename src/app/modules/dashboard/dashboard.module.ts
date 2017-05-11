import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompaniesService } from '../../services/companies.service';
import { SubdivisionsService } from '../../services/subdivisions.service';
import { CarsService } from '../../services/cars.service';
import { NavigationComponent } from './navigation/navigation.component';
import { TreeModule } from 'primeng/primeng';
import { ChartsComponent } from './charts/charts.component';
import { TreePipe } from '../../pipes/tree.pipe';
import { SharedModule } from '../shared.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    TreeModule,
    SharedModule
  ],
  declarations: [DashboardComponent, NavigationComponent, ChartsComponent],
  providers: [CompaniesService, SubdivisionsService, CarsService, TreePipe]
})
export class DashboardModule {
}
