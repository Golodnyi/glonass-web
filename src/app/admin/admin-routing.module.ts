import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../shared/guards/admin.guard';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent, canActivate: [AdminGuard],
    children: [
      {
        path: 'companies',
        loadChildren: './companies/companies.module#CompaniesModule'
      },
      {
        path: 'users',
        loadChildren: './users/users.module#UsersModule'
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
