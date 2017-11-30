import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguratorRoutingModule } from './configurator-routing.module';
import { ConfiguratorComponent } from './configurator/configurator.component';

@NgModule({
  imports: [
    CommonModule,
    ConfiguratorRoutingModule
  ],
  declarations: [ConfiguratorComponent]
})
export class ConfiguratorModule { }
