import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  public car: number;
  public options

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.car = +params['car'];
      this.options = {
        title: {text: 'simple chart'},
        series: [{
          data: [29.9, 71.5, 106.4, 129.2],
        }]
      };
    });
  }

}
