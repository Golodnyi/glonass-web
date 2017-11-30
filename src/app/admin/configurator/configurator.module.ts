import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguratorRoutingModule } from './configurator-routing.module';
import { ConfiguratorComponent } from './configurator/configurator.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SchemeComponent } from './scheme/scheme.component';
import { DropdownModule } from 'primeng/primeng';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ConfiguratorRoutingModule,
    SharedModule,
    DropdownModule
  ],
  declarations: [ConfiguratorComponent, NavigationComponent, SchemeComponent]
})
export class ConfiguratorModule { }
