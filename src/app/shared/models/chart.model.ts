export class Chart {
  public title;
  public series;
  public xAxis;
  public yAxis;
  public chart = {
    marginLeft: 0,
    spacingTop: 20,
    spacingBottom: 0,
    width: 600,
    height: 400
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
  public tooltip = {
    positioner: function () {
      return {
        x: this.chart.chartWidth - this.label.width,
        y: -1
      };
    },
    borderWidth: 0,
    valueDecimals: 0,
    backgroundColor: 'none',
    pointFormat: '{point.y}',
    headerFormat: '',
    shadow: false,
    style: {
      fontSize: '18px'
    },
  };

  constructor(options: any, width: number) {
    this.chart.width = width;

    this.title = {
      text: options.name,
      align: 'left',
      marginBottom: 10,
      x: -10
    };
    this.series = [{
      data: options.data,
      name: options.name,
      type: options.type,
      tooltip: {
        valueSuffix: ' ' + options.unit
      }
    }];
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

