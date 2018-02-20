import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MonitoringRoutingModule} from './monitoring-routing.module';
import {MonitoringComponent} from './monitoring/monitoring.component';
import {StateComponent} from './state/state.component';
import {PanelModule, DialogModule} from 'primeng/primeng';
import {ModalComponent} from './modal/modal.component';

@NgModule({
    imports     : [
        CommonModule,
        MonitoringRoutingModule,
        PanelModule,
        DialogModule
    ],
    declarations: [MonitoringComponent, StateComponent, ModalComponent]
})
export class MonitoringModule {
}
