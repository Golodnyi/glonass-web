import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminGuard} from '../../guards/admin.guard';
import {AdminComponent} from './admin/admin.component';

const routes: Routes = [
    {
        path: 'admin', component: AdminComponent, canActivate: [AdminGuard],
        children: [
            {
                path: 'companies',
                loadChildren: './companies/companies-routing.module#CompaniesRoutingModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class AdminRoutingModule {
}
