export class Chart {
    public series;
    public xAxis;
    public yAxis;
    public chart         = {
        marginLeft   : 0,
        spacingTop   : 20,
        spacingBottom: 0,
        width        : 600,
        height       : 360,
        reflow       : true
    };
    public tooltip       = {
        positioner     : function () {
            return {
                x: this.chart.chartWidth - this.label.width / 2,
                y: -10
            };
        },
        borderWidth    : 0,
        valueDecimals  : 0,
        backgroundColor: '#e6e6e6',
        pointFormat    : '{point.x:%d.%m %H:%M:%S}: {point.y}',
        headerFormat   : '',
        shadow         : false,
        style          : {
            fontSize: '14px'
        }
    };
    public scrollbar     = {
        liveRedraw: false
    };
    public navigator     = {
        adaptToUpdatedData: true
    };
    public plotOptions   = {
        pie: {
            size      : '100%',
            dataLabels: {
                enabled: false
            }
        }
    };
    public boost         = {
        useGPUTranslations: true,
        usePreAllocated   : true,
    };
    public credits       = {
        enabled: false
    };
    public legend        = {
        enabled: false
    };
    public rangeSelector = {
        buttons     : [{
            type : 'hour',
            count: 1,
            text : '1ч'
        }, {
            type : 'hour',
            count: 3,
            text : '3ч'
        }, {
            type : 'hour',
            count: 6,
            text : '6ч'
        }, {
            type : 'hour',
            count: 12,
            text : '12ч'
        }, {
            type : 'day',
            count: 1,
            text : '1д'
        }, {
            type : 'day',
            count: 3,
            text : '3д'
        }, {
            type : 'week',
            count: 1,
            text : '1н'
        }, {
            type : 'month',
            count: 1,
            text : '1м'
        }, {
            type : 'all',
            count: 1,
            text : 'Все'
        }],
        inputEnabled: false,
        selected    : 8
    };

    constructor(options: any) {
        this.series                = [{
            data   : options.data,
            name   : options.name,
            type   : 'column',
            tooltip: {
                valueSuffix: ' ' + options.unit
            },
            dataGrouping: {
                groupPixelWidth: 5,
                approximation: 'average'
            }
        }];
        this.xAxis                 = {
            crosshair: true,
        };

        this.yAxis                 = {
            plotBands: options.plotBands,
            plotLines: options.plotLines
        };

        if (options.plotLines && options.plotLines !== undefined) {
            let min = 0;
            let max = 0;

            options.plotLines.forEach(value => {
                if (value.color === 'red') {
                    if (!max) {
                        max = value.value;
                    } else if (max < value.value) {
                        min = max;
                        max = value.value;
                    }
                }
            });

            if (max) {
                this.yAxis.max = max;
            }

            if (min) {
                this.yAxis.min = min;
            }
        }

        this.tooltip.valueDecimals = options.decimals;
    }
}
