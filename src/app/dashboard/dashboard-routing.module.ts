import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { CompanyComponent } from './company/company.component';
import { ViewComponent } from './view/view.component';
import { ChartsComponent } from './view/charts/charts.component';
import { MapComponent } from './view/map/map.component';
import { TableComponent } from './view/table/table.component';

const routes: Routes = [{
  path: '', component: DashboardComponent, canActivate: [AuthGuard],
  children: [
    {
      path: 'view/:car', component: ViewComponent,
      children: [
        {path: 'charts', component: ChartsComponent},
        {path: 'map', component: MapComponent},
        {path: 'table', component: TableComponent},
      ]
    },
    {path: 'company/:company', component: CompanyComponent},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class DashboardRoutingModule {
}
