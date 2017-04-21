import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CarComponent} from './car/car.component';
import {EngineComponent} from './engine/engine.component';
import {CompaniesComponent} from './companies/companies.component';
import {CompanyUpdateComponent} from './company/update/update.component';
import {CompanyCreateComponent} from './company/create/create.component';
import {SubdivisionCreateComponent} from './subdivision/create/create.component';
import {SubdivisionUpdateComponent} from './subdivision/update/update.component';

const routes: Routes = [
  {
    path: '', component: CompaniesComponent,
    children: [
      {path: 'company/create', component: CompanyCreateComponent},
      {path: 'company/:id', component: CompanyUpdateComponent},
      {path: 'subdivision/create', component: SubdivisionCreateComponent},
      {path: 'subdivision/:id', component: SubdivisionUpdateComponent},
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
export class CompaniesRoutingModule {
}
