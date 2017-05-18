import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropDownPipe } from '../pipes/dropdown.pipe';
import { TreePipe } from 'app/pipes/tree.pipe';
import { ChartComponent } from '../components/chart/chart.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    TreePipe, DropDownPipe, ChartComponent
  ],
  exports: [
    TreePipe, DropDownPipe, ChartComponent
  ]
})
export class SharedModule {
}
