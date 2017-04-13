import {Component, OnInit} from '@angular/core';
import {ChartsService} from '../../../services/charts.service';
import {CarsService} from '../../../services/cars.service';
import {MsgService} from '../../../services/msg';

@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
