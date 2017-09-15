import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MonitoringRoutingModule} from './monitoring-routing.module';
import {MonitoringComponent} from './monitoring/monitoring.component';
import {StateComponent} from './state/state.component';
import {PanelModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    MonitoringRoutingModule,
    PanelModule
  ],
  declarations: [MonitoringComponent, StateComponent],
})
export class MonitoringModule {
}
