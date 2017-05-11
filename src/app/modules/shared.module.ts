import { NgModule } from '@angular/core';
import { ChartDirective } from '../directives/chart.directive';
import { CommonModule } from '@angular/common';
import { DropDownPipe } from '../pipes/dropdown.pipe';
import { TreePipe } from 'app/pipes/tree.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ChartDirective, TreePipe, DropDownPipe
  ],
  exports: [
    ChartDirective, TreePipe, DropDownPipe
  ]
})
export class SharedModule {
}
