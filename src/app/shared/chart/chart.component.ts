import { AfterViewChecked, Component, ElementRef, HostListener, Input, OnChanges, OnDestroy } from '@angular/core';
import * as highstock from 'highcharts/highstock';
import { Chart } from '../models/chart.model';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnChanges, OnDestroy, AfterViewChecked {
  public chart: any;
  private mouseMoveEvent: Subject<MouseEvent> = new Subject<MouseEvent>();
  private subscription: Subscription = new Subscription();
  @Input() data: any;

  @Input() set options(options: any) {
    if (this.chart) {
      this.chart.destroy();
    }
    if (Object.keys(options).length) {
      const currentChart = this.chart;
      const config = new Chart(options);
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
      this.chart = highstock.stockChart(this.el.nativeElement, config);
    }
  }

  ngOnChanges(changes: any) {
    if (changes.data) {
      const data = changes.data;
      if (data) {
        if (!data.firstChange) {
          data.currentValue.forEach(point => {
            this.chart.series[0].addPoint(point, false);
          });
          this.chart.redraw(true);
        }
      }
    }
  }

  @HostListener('mousemove', ['$event'])
  public onMousemove(e) {
    this.mouseMoveEvent.next(e);
  }

  constructor(private el: ElementRef) {
    highstock.Point.prototype.highlight = function () {
      this.onMouseOver();
    };
    highstock.Pointer.prototype.reset = function () {
      return undefined;
    };

    this.subscription.add(
      this.mouseMoveEvent.debounceTime(200).subscribe(e => {
        const currentPoint = this.chart.series[0].searchPoint(e, true);
        if (currentPoint === undefined) {
          return false;
        }
        highstock.charts.forEach(chart => {
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
      })
    );
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
    this.subscription.unsubscribe();
  }

  ngAfterViewChecked() {
    const width = this.el.nativeElement.parentElement.offsetWidth - 35;
    highstock.charts.forEach(chart => {
      if (chart && chart.chartWidth !== width) {
        chart.setSize(width, 360);
      }
    });
  }
}
