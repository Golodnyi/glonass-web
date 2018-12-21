export class MultiChart {
    public series = [];
    public xAxis;
    public yAxis;
    public chart = {
        marginLeft: 0,
        spacingTop: 20,
        spacingBottom: 0,
        width: 600,
        height: 680,
        reflow: false
    };
    public tooltip = {
        backgroundColor: '#fff',
        shadow: true,
        style: {
            fontSize: '10px'
        },
        valueDecimals: 1
    };
    public scrollbar = {
        liveRedraw: true
    };
    public navigator = {
        adaptToUpdatedData: true
    };
    public plotOptions = {
        pie: {
            size: '100%',
            dataLabels: {
                enabled: false
            }
        }
    };
    public credits = {
        enabled: false
    };
    public legend = {
        enabled: true
    };
    public boost = {
        useGPUTranslations: true,
        usePreAllocated: true,
        seriesThreshold: 5,
    };
    public rangeSelector = {
        buttons: [{
            type: 'hour',
            count: 1,
            text: '1h'
        }, {
            type: 'hour',
            count: 3,
            text: '3h'
        }, {
            type: 'hour',
            count: 6,
            text: '6h'
        }, {
            type: 'hour',
            count: 12,
            text: '12h'
        }, {
            type: 'day',
            count: 1,
            text: '1d'
        }, {
            type: 'day',
            count: 3,
            text: '3d'
        }, {
            type: 'week',
            count: 1,
            text: '1w'
        }, {
            type: 'month',
            count: 1,
            text: '1m'
        }, {
            type: 'all',
            count: 1,
            text: 'All'
        }],
        inputEnabled: false,
        selected: 8
    };

    constructor(options: any) {
        options.data.forEach(option => {
            this.series.push({
                type: 'spline',
                data: option.data,
                name: option.name,
                color: option.color,
                tooltip: {
                    valueSuffix: ' ' + option.unit,
                    pointFormat: '<span style="color: '
                        + option.color + '"> ' + option.name +
                        ' </span>: <b>{point.y}</b>',
                    split: true,
                    valueDecimals: option.decimals
                },
                dataGrouping: {
                    groupPixelWidth: 30,
                    approximation: 'average'
                }
            });
        });

        if (options.displayLimits && options.displayLimits !== undefined) {
            if (options.displayLimits[0] !== false) {
                this.yAxis.min = options.displayLimits[0];
            }

            if (options.displayLimits[1] !== false) {
                this.yAxis.max = options.displayLimits[1];
            }
        }

        this.xAxis = {
            crosshair: true,
            events: null
        };
        this.yAxis = {
            plotBands: options.plotBands,
            plotLines: options.plotLines
        };
    }
}
