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

export class MultiChartComponent implements OnDestroy {
  public chart: any;

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
              chart.xAxis[0].setExtremes(e.min, e.max, undefined, false, { trigger: 'syncExtremes' });
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

  constructor(private el: ElementRef) {
    Highcharts.Point.prototype.highlight = function () {
      this.onMouseOver();
    };
    Highcharts.Pointer.prototype.reset = function () {
      return undefined;
    };
  }

  @HostListener('mousemove', ['$event'])
  public onMousemove(e) {
    const currentPoint = this.chart.series[0].searchPoint(e, true);
    if (currentPoint === undefined) {
      return false;
    }
    Highcharts.charts.forEach(chart => {
      if (chart === undefined || chart === this.chart) {
        return false;
      }
      if (chart.series[0]) {
        const point = chart.series[0].searchPoint({
          chartX: currentPoint.plotX + chart.plotLeft,
          chartY: currentPoint.plotY + chart.plotTop
        }, true);
        if (point) {
          point.highlight(e);
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
