import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguratorRoutingModule } from './configurator-routing.module';
import { ConfiguratorComponent } from './configurator/configurator.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SchemeComponent } from './scheme/scheme.component';
import { DropdownModule, InputTextModule, PanelModule, CheckboxModule, ButtonModule } from 'primeng/primeng';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { SensorComponent } from './sensor/sensor.component';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@NgModule({
    imports     : [
        CommonModule,
        ConfiguratorRoutingModule,
        SharedModule,
        DropdownModule,
        InputTextModule,
        FormsModule,
        PanelModule,
        InputTextModule,
        CheckboxModule,
        ButtonModule,
        TranslateModule
    ],
    declarations: [ConfiguratorComponent, NavigationComponent, SchemeComponent, SensorComponent],
    providers: [TranslatePipe]
})
export class ConfiguratorModule {
}
