import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropDownPipe } from './pipes/dropdown.pipe';
import { TreePipe } from 'app/shared/pipes/tree.pipe';
import { ChartComponent } from './chart/chart.component';
import { TablePipe } from './pipes/table.pipe';
import { KeysPipe } from './pipes/keys.pipe';
import { ColorPipe } from './pipes/color.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    TreePipe, DropDownPipe, ChartComponent, TablePipe, KeysPipe, ColorPipe
  ],
  exports: [
    TreePipe, DropDownPipe, ChartComponent, TablePipe, KeysPipe, ColorPipe
  ]
})
export class SharedModule {
}
