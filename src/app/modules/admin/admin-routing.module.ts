import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminComponent} from './admin/admin.component';
import {AdminGuard} from '../../guards/admin.guard';
import {CompanyComponent} from './company/company.component';
import {SubdivisionComponent} from './subdivision/subdivision.component';
import {EngineComponent} from './engine/engine.component';
import {CarComponent} from './car/car.component';

const routes: Routes = [
    {path: 'admin', component: AdminComponent, canActivate: [AdminGuard]},
    {path: 'admin/company/:id', component: CompanyComponent, canActivate: [AdminGuard]},
    {path: 'admin/subdivision/:id', component: SubdivisionComponent, canActivate: [AdminGuard]},
    {path: 'admin/car/:id', component: CarComponent, canActivate: [AdminGuard]},
    {path: 'admin/engine/:id', component: EngineComponent, canActivate: [AdminGuard]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class AdminRoutingModule {
}
