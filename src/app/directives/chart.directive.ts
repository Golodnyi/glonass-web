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
    this.chartsService.setMouseEvent(e);
  }

  public syncExtremes(e) {
    if (e.trigger !== 'syncExtremes') {
      if (this.chart.xAxis[0].setExtremes) {
        this.chart.xAxis[0].setExtremes(e.min, e.max, undefined, false, {trigger: 'syncExtremes'});
      }
    }
  }

  constructor(private el: ElementRef, private chartsService: ChartsService) {
    this.chartsService.getMouseEvent().subscribe(
      e => {
        if (e) {
          highstock.Pointer.prototype.reset = function () {
            return undefined;
          };
          const event = this.chart.pointer.normalize(e.originalEvent);
          const point = this.chart.series[0].searchPoint(event, true);
          if (point) {
            // this.chart.tooltip.refresh(this); //
            // this.chart.xAxis[0].drawCrosshair(event, this);
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
