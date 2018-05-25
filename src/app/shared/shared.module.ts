import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropDownPipe } from './pipes/dropdown.pipe';
import { ChartComponent } from './chart/chart.component';
import { MultiChartComponent } from './multi-chart/multi-chart.component';
import { TablePipe } from './pipes/table.pipe';
import { KeysPipe } from './pipes/keys.pipe';
import { ColorPipe } from './pipes/color.pipe';
import { AllowPortsPipe } from './pipes/allowports.pipe';
import { TreePipe } from './pipes/tree.pipe';
import { ChartTranslatePipe } from './pipes/chartTranslate.pipe';

@NgModule({
    imports     : [
        CommonModule
    ],
    declarations: [
        TreePipe, DropDownPipe, ChartComponent, MultiChartComponent, TablePipe, KeysPipe, ColorPipe, AllowPortsPipe, ChartTranslatePipe
    ],
    exports     : [
        TreePipe, DropDownPipe, ChartComponent, MultiChartComponent, TablePipe, KeysPipe, ColorPipe, AllowPortsPipe, ChartTranslatePipe
    ]
})
export class SharedModule {
}
