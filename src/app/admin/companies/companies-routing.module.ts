import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyUpdateComponent } from './company/update/update.component';
import { CompanyCreateComponent } from './company/create/create.component';
import { SubdivisionCreateComponent } from './subdivision/create/create.component';
import { SubdivisionUpdateComponent } from './subdivision/update/update.component';
import { CarCreateComponent } from './car/create/create.component';
import { CarUpdateComponent } from './car/update/update.component';
import { EngineCreateComponent } from './engine/create/create.component';
import { EngineUpdateComponent } from './engine/update/update.component';

const routes: Routes = [
  {
    path: '', component: CompaniesComponent,
    children: [
      {path: 'company/create', component: CompanyCreateComponent},
      {path: 'company/:company', component: CompanyUpdateComponent},
      {path: 'subdivision/create', component: SubdivisionCreateComponent},
      {path: 'car/create', component: CarCreateComponent},
      {path: 'engine/create', component: EngineCreateComponent},
      {path: 'company/:company/subdivision/:subdivision', component: SubdivisionUpdateComponent},
      {path: 'company/:company/subdivision/:subdivision/car/:car', component: CarUpdateComponent},
      {path: 'company/:company/subdivision/:subdivision/car/:car/engine/:engine', component: EngineUpdateComponent}
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
