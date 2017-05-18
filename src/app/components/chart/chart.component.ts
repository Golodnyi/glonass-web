import { Component, ElementRef, HostListener, Input, OnChanges, OnDestroy } from '@angular/core';
import * as highstock from 'highcharts/highstock';
import { Chart } from '../../models/Chart';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnChanges, OnDestroy {
  private chart: any;
  @Input() options: any;
  @Input() data: any;
  private i = 1000;
  ngOnChanges(changes: any) {
    const options = changes.options;
    const data = changes.data;
    if (data) {
      if (!data.firstChange) {
        data.currentValue.forEach(point => {
          point[0] += this.i;
          this.chart.series[0].addPoint(point, true);
        });
        this.i += 1000;
      }
    }
    if (options) {
      if (options.firstChange) {
        const config = new Chart(this.options, this.el.nativeElement.parentElement.offsetWidth);
        config.xAxis.events = {
          setExtremes: function (e) {
            if (e.trigger !== 'syncExtremes') {
              highstock.charts.forEach(function (chart) {
                if (chart === undefined || chart === this.chart) {
                  return false;
                }
                chart.xAxis[0].setExtremes(e.min, e.max, undefined, false, {trigger: 'syncExtremes'});
              });
            }
          }
        };
        this.chart = highstock.stockChart(this.el.nativeElement, config);
      } else {
        this.options = options.currentValue;
      }
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

  constructor(private el: ElementRef) {
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
