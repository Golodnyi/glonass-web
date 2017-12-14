import { Component, ElementRef, HostListener, Input, OnChanges, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import * as HighchartsExporting from 'highcharts/modules/exporting';
import * as HighchartsOfflineExporting from 'highcharts/modules/offline-exporting';
import { MultiChart } from '../models/multi-chart.model';

window['Highcharts'] = Highcharts;
HighchartsExporting(Highcharts);
HighchartsOfflineExporting(Highcharts);

@Component({
  selector: 'app-multi-chart',
  templateUrl: './multi-chart.component.html',
  styleUrls: ['./multi-chart.component.css']
})

export class MultiChartComponent implements OnDestroy, OnChanges {
  public chart: any;
  @Input() data: any;

  @Input()
  set options(options: any) {
    if (this.chart) {
      this.chart.destroy();
    }
    if (Object.keys(options).length) {
      const currentChart = this.chart;
      const config = new MultiChart(options);
      config.chart.width = this.el.nativeElement.parentElement.offsetWidth - 35;
      config.xAxis.events = {
        setExtremes: function (e) {
          if (e.trigger !== 'syncExtremes') {
            Highcharts.charts.forEach(function (chart) {
              if (chart === undefined || chart === currentChart) {
                return false;
              }
            });
          }
        }
      };
      Highcharts.setOptions({
        global: {
          useUTC: false
        }
      });
      this.chart = new Highcharts.stockChart(this.el.nativeElement, config);
      // TODO: получение SVG графика
      // console.log(this.chart.getSVG());
    }
  }

  constructor(private el: ElementRef) { }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  ngOnChanges(changes: any) {
    if (changes.data) {
      const data = changes.data;
      if (data) {
        if (!data.firstChange) {
          let i = 0;
          let update = false;
          data.currentValue.forEach(item => {
            item.data.forEach(point => {
              update = true;
              this.chart.series[i].addPoint(point, false);
            });
            i++;
          });
          if (update) {
            this.chart.redraw(true);
          }
        }
      }
    }
  }

}
