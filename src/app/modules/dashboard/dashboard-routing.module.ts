import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from '../../guards/auth.guard';
import {ChartsComponent} from './charts/charts.component';

const routes: Routes = [{
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
        {path: 'charts/:car', component: ChartsComponent},
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class DashboardRoutingModule {
}
