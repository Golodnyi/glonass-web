import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminGuard} from '../../guards/admin.guard';
import {CompanyComponent} from './company/company.component';
import {SubdivisionComponent} from './subdivision/subdivision.component';
import {EngineComponent} from './engine/engine.component';
import {CarComponent} from './car/car.component';
import {AdminComponent} from './admin/admin.component';

const routes: Routes = [
    {
        path: 'admin', component: AdminComponent, canActivate: [AdminGuard],
        children: [
            {path: 'company/:id', component: CompanyComponent},
            {path: 'subdivision/:id', component: SubdivisionComponent},
            {path: 'car/:id', component: CarComponent},
            {path: 'engine/:id', component: EngineComponent}
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
