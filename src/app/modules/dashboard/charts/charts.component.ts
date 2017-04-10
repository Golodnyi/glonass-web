import {Component, Input, OnInit} from '@angular/core';
import {Car} from "../../../models/Car";

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  @Input() car: number;

  constructor() { }

  ngOnInit() {
  }

}
