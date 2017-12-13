export class MultiChart {
  public series = [];
  public xAxis;
  public yAxis;
  public chart = {
    marginLeft: 0,
    spacingTop: 20,
    spacingBottom: 0,
    width: 600,
    height: 360,
    reflow: false
  };
  public tooltip = {
    positioner: function () {
      return {
        x: this.chart.chartWidth - this.label.width,
        y: -10
      };
    },
    borderWidth: 0,
    valueDecimals: 0,
    backgroundColor: 'none',
    pointFormat: '{point.x:%d.%m %H:%M:%S}: {point.y}',
    headerFormat: '',
    shadow: false,
    style: {
      fontSize: '14px'
    }
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
    enabled: false
  };
  public rangeSelector = {
    buttons: [{
      type: 'hour',
      count: 1,
      text: '1ч'
    }, {
      type: 'hour',
      count: 3,
      text: '3ч'
    }, {
      type: 'hour',
      count: 6,
      text: '6ч'
    }, {
      type: 'hour',
      count: 12,
      text: '12ч'
    }, {
      type: 'day',
      count: 1,
      text: '1д'
    }, {
      type: 'day',
      count: 3,
      text: '3д'
    }, {
      type: 'week',
      count: 1,
      text: '1н'
    }, {
      type: 'month',
      count: 1,
      text: '1м'
    }, {
      type: 'all',
      count: 1,
      text: 'Все'
    }],
    inputEnabled: false,
    selected: 1
  };

  constructor(options: any) {
    options.forEach(option => {
      this.series.push({
        data: option.data,
        name: option.name,
        type: option.type,
        color: option.color,
        tooltip: {
          valueSuffix: ' ' + option.unit
        }
      });
    });

    this.xAxis = {
      crosshair: true,
      events: null
    };
    this.yAxis = {
      plotBands: options.plotBands,
      plotLines: options.plotLines
    };
    this.tooltip.valueDecimals = options.decimals;
  }
}
