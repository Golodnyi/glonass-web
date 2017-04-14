import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TreeModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TabMenuModule} from 'primeng/primeng';
import {CompaniesRoutingModule} from './companies-routing.module';
import {NavigationComponent} from './navigation/navigation.component';
import {CompanyComponent} from './company/company.component';
import {CarComponent} from './car/car.component';
import {EngineComponent} from './engine/engine.component';
import {SubdivisionComponent} from './subdivision/subdivision.component';
import {CompaniesComponent} from './companies/companies.component';

@NgModule({
    imports: [
        CommonModule,
        CompaniesRoutingModule,
        FormsModule,
        TreeModule,
        InputTextModule,
        ButtonModule,
        CalendarModule,
        BrowserAnimationsModule,
        TabMenuModule
    ],
    declarations: [NavigationComponent, CompaniesComponent, CompanyComponent, CarComponent, EngineComponent, SubdivisionComponent],
})
export class CompaniesModule {
}
