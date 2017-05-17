export class Chart {
  public chart = {
    marginLeft: 0,
    spacingTop: 20,
    spacingBottom: 0
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
    backgroundColor: 'none',
    pointFormat: '{point.y}',
    headerFormat: '',
    shadow: false,
    style: {
      fontSize: '18px'
    },
  };
}

