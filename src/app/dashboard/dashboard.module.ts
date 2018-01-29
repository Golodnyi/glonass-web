import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CompaniesService} from '../shared/services/companies.service';
import {SubdivisionsService} from '../shared/services/subdivisions.service';
import {CarsService} from '../shared/services/cars.service';
import {NavigationComponent} from './navigation/navigation.component';
import {
    AccordionModule,
    BlockUIModule,
    CalendarModule,
    CheckboxModule,
    DataTableModule,
    DialogModule,
    FieldsetModule,
    InputSwitchModule,
    InputTextareaModule,
    MultiSelectModule,
    PaginatorModule,
    PanelModule,
    SelectButtonModule,
    TabViewModule,
    ToggleButtonModule,
    TreeModule
} from 'primeng/primeng';
import {TreePipe} from '../shared/pipes/tree.pipe';
import {SharedModule} from '../shared/shared.module';
import {ChartsService} from '../shared/services/charts.service';
import {StateComponent} from './state/state.component';
import {FilterComponent} from './filter/filter.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SensorsService} from '../shared/services/sensors.service';
import {YmapsComponent} from './ymaps/ymaps.component';
import {CompanyComponent} from './company/company.component';
import {TableComponent} from './table/table.component';
import {PdfComponent} from './pdf/pdf.component';
import {ViewComponent} from './view/view.component';
import {ChartsComponent} from './view/charts/charts.component';
import {MapComponent} from './view/map/map.component';
import {TableComponent as TableViewComponent} from './view/table/table.component';
import {ThermocouplesTableComponent} from './thermocouples-table/thermocouples-table.component';
import {ThermocouplesComponent} from './view/thermocouples/thermocouples.component';
import {MonitoringComponent} from './monitoring/monitoring.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {MonitoringService} from './monitoring/shared/monitoring.service';

@NgModule({
    imports     : [
        CommonModule,
        DashboardRoutingModule,
        TreeModule,
        SharedModule,
        MultiSelectModule,
        CalendarModule,
        FormsModule,
        ReactiveFormsModule,
        AccordionModule,
        InputSwitchModule,
        CheckboxModule,
        PanelModule,
        TabViewModule,
        ToggleButtonModule,
        FieldsetModule,
        PaginatorModule,
        SelectButtonModule,
        DialogModule,
        BlockUIModule,
        InputTextareaModule,
        DataTableModule
    ],
    declarations: [
        DashboardComponent, NavigationComponent, ViewComponent, StateComponent, MonitoringComponent,
        FilterComponent, YmapsComponent, CompanyComponent, TableComponent, PdfComponent,
        ChartsComponent, MapComponent, TableViewComponent, ThermocouplesTableComponent, ThermocouplesComponent,
        WelcomeComponent
    ],
    providers   : [CompaniesService, SubdivisionsService, CarsService, TreePipe, ChartsService, SensorsService,
        MonitoringService]
})
export class DashboardModule {
}
