import { Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import * as highstock from 'highcharts/highstock';
@Directive({selector: '[appChart]'})
export class ChartDirective implements OnDestroy {
  private _options: any;
  private chart: any;

  @Input('appChart')
  set options(options: any) {
    this._options = options;
    if (this.chart) {
      this.chart.destroy();
    }

    if (this._options) {
      (this.chart = highstock.stockChart(this.el.nativeElement, this._options));
    }
  }

  constructor(private el: ElementRef) {
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
