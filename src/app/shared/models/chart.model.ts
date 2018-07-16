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
            text : '1h'
        }, {
            type : 'hour',
            count: 3,
            text : '3h'
        }, {
            type : 'hour',
            count: 6,
            text : '6h'
        }, {
            type : 'hour',
            count: 12,
            text : '12h'
        }, {
            type : 'day',
            count: 1,
            text : '1d'
        }, {
            type : 'day',
            count: 3,
            text : '3d'
        }, {
            type : 'week',
            count: 1,
            text : '1w'
        }, {
            type : 'month',
            count: 1,
            text : '1m'
        }, {
            type : 'all',
            count: 1,
            text : 'All'
        }],
        inputEnabled: false,
        selected    : 8
    };

    constructor(options: any) {
        this.series = [{
            data        : options.data,
            name        : options.name,
            type        : 'column',
            tooltip     : {
                valueSuffix: ' ' + options.unit
            },
            dataGrouping: {
                groupPixelWidth: 5,
                approximation  : 'average'
            }
        }];
        this.xAxis  = {
            crosshair: true,
        };

        this.yAxis = {
            plotBands: options.plotBands,
            plotLines: options.plotLines
        };

        if (options.displayLimits && options.displayLimits !== undefined) {
            if (options.displayLimits[0] !== false) {
                this.yAxis.min = options.displayLimits[0];
            }

            if (options.displayLimits[1] !== false) {
                this.yAxis.max = options.displayLimits[1];
            }
        }

        this.tooltip.valueDecimals = options.decimals;
    }
}
