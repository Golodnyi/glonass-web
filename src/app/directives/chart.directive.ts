import { Directive, ElementRef, HostListener, Input, OnDestroy } from '@angular/core';
import * as highstock from 'highcharts/highstock';
import { ChartsService } from '../services/charts.service';
@Directive({selector: '[appChart]'})
export class ChartDirective implements OnDestroy {
  private _options: any;
  private chart: any;

  @Input('options')
  set options(options: any) {
    this._options = options;
    if (this.chart) {
      this.chart.destroy();
    }

    if (this._options) {
      this.chart = highstock.stockChart(this.el.nativeElement, this._options);
    }
  }

  @HostListener('mousemove', ['$event'])
  public onMousemove(e) {
    this.chartsService.setMouseEvent(this.chart, e);
  }

  constructor(private el: ElementRef, private chartsService: ChartsService) {
    /**
     * TODO: нужен рефакторинг
     */
    this.chartsService.getMouseEvent().subscribe(
      e => {
        if (e) {
          highstock.Point.prototype.highlight = function (event) {
            this.onMouseOver();
          };
          highstock.Pointer.prototype.reset = function () {
            return undefined;
          };
          for (let i = 0; i < highstock.charts.length; i = i + 1) {
            const chart = highstock.charts[i];
            const event = chart.pointer.normalize(e.originalEvent);
            const point = chart.series[0].searchPoint(event, true);

            if (point) {
              point.highlight(e);
            }
          }
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
