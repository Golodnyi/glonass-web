import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {GuestGuard} from './login/shared/guards/guest.guard';
import {LogoutComponent} from './logout/logout.component';
import {AuthGuard} from './shared/guards/auth.guard';
import {AdminGuard} from './admin/shared/guards/admin.guard';

const routes: Routes = [
    {
        path: '', component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [GuestGuard]
    },
    {
        path: 'logout',
        component: LogoutComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
    },
    {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule'
    },
    {
        path: 'admin/monitoring',
        loadChildren: './monitoring/monitoring.module#MonitoringModule',
        canActivate: [AdminGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule {
}
