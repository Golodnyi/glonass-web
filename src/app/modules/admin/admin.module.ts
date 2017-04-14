import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin/admin.component';
import {TabMenuModule} from 'primeng/primeng';
import {CompaniesModule} from './companies/companies.module';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        TabMenuModule,
        CompaniesModule
    ],
    declarations: [AdminComponent],
})
export class AdminModule {
}
