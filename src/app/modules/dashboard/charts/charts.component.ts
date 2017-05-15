import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  public car: number;
  public settings = {
    chart: {
      marginLeft: 40, // Keep all charts left aligned
      spacingTop: 20,
      spacingBottom: 20
    },
    title: {
      text: 'Default name',
      align: 'left',
      margin: 0,
      x: 30
    },
    credits: {
      enabled: false
    },
    legend: {
      enabled: false
    },
    xAxis: {
      crosshair: true,
      events: {
        setExtremes: null
      },
      labels: {
        format: '{value}'
      }
    },
    yAxis: {
      title: {
        text: null
      }
    },
    tooltip: {
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
      valueDecimals: null
    },
  };
  public options: any;
  public options2: any;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
        this.car = +params['car'];
        this.options = Object.assign({}, this.settings);
        this.options.title.text = 'first chart';
        this.options.series = [{
          data: [29.9, 71.5, 106.4, 129.2, 146, 100, 80, 120, 29.9, 71.5, 106.4, 129.2, 146, 100, 80, 120],
        }];

        this.options2 = Object.assign({}, this.settings);
        this.options2.title.text = 'second chart';
        this.options2.series = [{
          data: [12, 17, 25, 74, 29.9, 71.5, 106.4, 129.2, 146, 100, 80, 120, 25, 12, 22, 78],
        }];

      }
    );
  }
}
