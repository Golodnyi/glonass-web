import { Component, ElementRef, HostListener, Input, OnDestroy } from '@angular/core';
import * as highstock from 'highcharts/highstock';
import { ChartsService } from '../../services/charts.service';
import { Chart } from '../../models/Chart';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnDestroy {
  private chart: any;
  @Input() set options(options: any) {
    if (this.chart) {
      this.chart.destroy();
    }

    if (options) {
      const currentChart = this.chart;
      const config = new Chart(options, this.el.nativeElement.parentElement.offsetWidth);
      config.xAxis.events = {
        setExtremes: function (e) {
          if (e.trigger !== 'syncExtremes') {
            highstock.charts.forEach(function (chart) {
              if (chart === undefined || chart === currentChart) {
                return false;
              }
              chart.xAxis[0].setExtremes(e.min, e.max, undefined, false, {trigger: 'syncExtremes'});
            });
          }
        }
      };
      this.chart = highstock.stockChart(this.el.nativeElement, config).innerHtml;
      /** if (this.autorefresh) {
        const lastPoint = $this.options[0].series[template.series.length - 1]
          .data[template.series[template.series.length - 1]
          .data.length - 1][0];
      } **/
    }
  }

  @HostListener('mousemove', ['$event'])
  public onMousemove(e) {
    highstock.charts.forEach(function (chart) {
      if (chart === undefined) {
        return false;
      }
      const event = chart.pointer.normalize(e.originalEvent);
      if (chart.series[0]) {
        const point = chart.series[0].searchPoint(event, true);

        if (point) {
          point.highlight(e);
        }
      }
    });
  }

  constructor(private el: ElementRef, private chartsService: ChartsService) {
    highstock.Point.prototype.highlight = function () {
      this.onMouseOver();
    };
    highstock.Pointer.prototype.reset = function () {
      return undefined;
    };
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
