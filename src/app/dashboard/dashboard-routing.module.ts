import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from '../shared/guards/auth.guard';
import {ChartsComponent} from './charts/charts.component';
import {CompanyComponent} from './company/company.component';

const routes: Routes = [{
  path: '', component: DashboardComponent, canActivate: [AuthGuard],
  children: [
    {path: 'charts/:car', component: ChartsComponent},
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
