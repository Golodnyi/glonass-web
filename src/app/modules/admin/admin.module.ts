import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin/admin.component';
import {FormsModule} from '@angular/forms';
import {NavigationComponent} from './navigation/navigation.component';
import {TreeModule} from 'primeng/primeng';
import {CompanyComponent} from './company/company.component';
import {SubdivisionComponent} from './subdivision/subdivision.component';
import {CarComponent} from './car/car.component';
import {EngineComponent} from './engine/engine.component';
import {InputTextModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TabViewModule} from 'primeng/primeng';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        FormsModule,
        TreeModule,
        InputTextModule,
        ButtonModule,
        CalendarModule,
        BrowserAnimationsModule,
        TabViewModule
    ],
    declarations: [AdminComponent, NavigationComponent, CompanyComponent, SubdivisionComponent, CarComponent, EngineComponent],
    bootstrap: [AdminComponent]
})
export class AdminModule {
}
