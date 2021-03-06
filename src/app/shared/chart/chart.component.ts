import { Component, ElementRef, HostListener, Input, OnChanges, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import * as HighchartsExporting from 'highcharts/modules/exporting';
import * as HighchartsOfflineExporting from 'highcharts/modules/offline-exporting';
import { Chart } from '../models/chart.model';
import { TranslateService } from '@ngx-translate/core';

window['Highcharts'] = Highcharts;
HighchartsExporting(Highcharts);
HighchartsOfflineExporting(Highcharts);

@Component({
    selector   : 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls  : ['./chart.component.css']
})

export class ChartComponent implements OnChanges, OnDestroy {
    public chart: any;
    @Input() data: any;

    @Input()
    set options(options: any) {
        if (this.chart) {
            this.chart.destroy();
        }
        if (Object.keys(options).length) {
            const currentChart  = this.chart;
            options.unit = this.translateService.instant(options.unit);
            const config        = new Chart(options);
            config.chart.width  = this.el.nativeElement.parentElement.offsetWidth - 35;
            config.xAxis.events = {
                setExtremes: function (e) {
                    if (e.trigger !== 'syncExtremes') {
                        Highcharts.charts.forEach(function (chart) {
                            if (chart === undefined || chart === currentChart) {
                                return false;
                            }
                            chart.xAxis[0].setExtremes(e.min, e.max, undefined, false, {trigger: 'syncExtremes'});
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
        }
    }

    constructor(private el: ElementRef, private translateService: TranslateService) {
        Highcharts.Point.prototype.highlight = function () {
            this.onMouseOver();
        };
        Highcharts.Pointer.prototype.reset   = function () {
            return undefined;
        };
    }

    ngOnChanges(changes: any) {
        if (changes.data) {
            const data = changes.data;
            if (data) {
                let update = false;
                if (!data.firstChange) {
                    data.currentValue.forEach(point => {
                        update = true;
                        this.chart.series[0].addPoint(point, false);
                    });

                    if (update) {
                        this.chart.redraw(true);
                    }
                }
            }
        }
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
