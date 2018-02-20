import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MonitoringRoutingModule} from './monitoring-routing.module';
import {MonitoringComponent} from './monitoring/monitoring.component';
import {StateComponent} from './state/state.component';
import {PanelModule, DialogModule} from 'primeng/primeng';
import {ModalComponent} from './modal/modal.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/components/button/button';

@NgModule({
    imports     : [
        CommonModule,
        MonitoringRoutingModule,
        PanelModule,
        DialogModule,
        ButtonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [MonitoringComponent, StateComponent, ModalComponent]
})
export class MonitoringModule {
}
